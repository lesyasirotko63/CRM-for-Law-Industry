const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ActivitiesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.create(
      {
        id: data.id || undefined,

        scheduled_at: data.scheduled_at || null,
        description: data.description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await activities.setRelated_to(data.related_to || null, {
      transaction,
    });

    await activities.setAssigned_to(data.assigned_to || null, {
      transaction,
    });

    return activities;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const activitiesData = data.map((item, index) => ({
      id: item.id || undefined,

      scheduled_at: item.scheduled_at || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const activities = await db.activities.bulkCreate(activitiesData, {
      transaction,
    });

    // For each item created, replace relation files

    return activities;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.findByPk(id, {
      transaction,
    });

    await activities.update(
      {
        scheduled_at: data.scheduled_at || null,
        description: data.description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await activities.setRelated_to(data.related_to || null, {
      transaction,
    });

    await activities.setAssigned_to(data.assigned_to || null, {
      transaction,
    });

    return activities;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.findByPk(id, options);

    await activities.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await activities.destroy({
      transaction,
    });

    return activities;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const activities = await db.activities.findOne({ where }, { transaction });

    if (!activities) {
      return activities;
    }

    const output = activities.get({ plain: true });

    output.related_to = await activities.getRelated_to({
      transaction,
    });

    output.assigned_to = await activities.getAssigned_to({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.leads,
        as: 'related_to',
      },

      {
        model: db.users,
        as: 'assigned_to',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'activities',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.scheduled_atRange) {
        const [start, end] = filter.scheduled_atRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            scheduled_at: {
              ...where.scheduled_at,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            scheduled_at: {
              ...where.scheduled_at,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.related_to) {
        var listItems = filter.related_to.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          related_toId: { [Op.or]: listItems },
        };
      }

      if (filter.assigned_to) {
        var listItems = filter.assigned_to.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          assigned_toId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.activities.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.activities.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('activities', 'description', query),
        ],
      };
    }

    const records = await db.activities.findAll({
      attributes: ['id', 'description'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['description', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.description,
    }));
  }
};
