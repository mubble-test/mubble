"use strict";
/*------------------------------------------------------------------------------
   About      : <Write about the file here>
   
   Created on : Sat May 19 2018
   Author     : Raghvendra Varma
   
   Copyright (c) 2018 Mubble Networks Private Limited. All rights reserved.
------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.Muds = exports.EntityType = void 0;
const muds_base_entity_1 = require("./muds-base-entity");
const muds_io_1 = require("./muds-io");
const muds_query_1 = require("./muds-query");
const muds_manager_1 = require("./muds-manager");
const muds_util_1 = require("./muds-util");
var EntityType;
(function (EntityType) {
    EntityType[EntityType["Dummy"] = 0] = "Dummy";
    EntityType[EntityType["Struct"] = 1] = "Struct";
    EntityType[EntityType["Normal"] = 2] = "Normal";
})(EntityType = exports.EntityType || (exports.EntityType = {}));
class Muds {
    /**
     * * Annotation to mark a class as Normal Muds Entity (Mandatory: one of entity / embeddedEntity / dummmy )
     * * Name of entity is fixed based on the class name. Entity classes cannot be minified or renamed
     * * Level: Class declaration
     */
    static entity(version, pkType) {
        return this.manager.registerEntity.bind(this.manager, version, pkType, EntityType.Normal);
    }
    /**
     * * Annotation to mark a class as Dummy Muds Entity (Mandatory: one of entity / embeddedEntity / dummmy )
     * * A dummy entity that is kept just to build the hierarchical ancestor chain.  No IO is permitted on them directly
     * * Level: Class declaration
     */
    static dummy(pkType) {
        return this.manager.registerEntity.bind(this.manager, 0, pkType, EntityType.Dummy);
    }
    /**
     * * Annotation to mark a class as Muds Struct (Mandatory: one of entity / Struct / dummmy )
     * * A struct allows field level validations when used in entity
     * * Level: Class declaration
     */
    static struct() {
        return this.manager.registerEntity.bind(this.manager, 0, Muds.Pk.None, EntityType.Struct);
    }
    /**
     * * Optional annotation to provide ancestors of an entity
     * * You should list them in same order as in the key. Example => grandfather, father
     * * Level: Class declaration
     */
    static ancestors(...modelNames) {
        return this.manager.registerAncestors.bind(this.manager, modelNames);
    }
    /**
     * * Optional annotation to provide composite indexes of an entity
     * * You should have a real good reason why you need this as composite indexes
     * * are sparingly available (total 200 for a project)
     *
     * Pending
     * * Check presence of composite index before running a query
     * * Allow composite index on embedded entity
     *
     * * Level: Class declaration
     */
    static compositeIndex(idxObj) {
        return this.manager.registerCompositeIndex.bind(this.manager, idxObj);
    }
    /**
     * * Annotation to mark a field of Muds Entity (Mandatory: one of field / indexed / embedded entity )
     * * presence=Muds.Opt, field is optional. Muds.Man means that field should atleast be set null
     * * typeHint=Field type when it cannot be auto detected example Array
     *
     * * Level: property declaration
     */
    static field(presence, typeHint) {
        return this.manager.registerField.bind(this.manager, {
            mandatory: presence === Muds.Man, typeHint
        });
    }
    /**
     * * Marks a property for as indexed in datastore.
     * * Read documentation of Muds.field
     * * For an indexed field, when presence is changed to 'false': we will need to run data migration
     * * Level: property declaration
     */
    static indexed(presence, typeHint) {
        return this.manager.registerField.bind(this.manager, {
            mandatory: presence === Muds.Man, indexed: true, typeHint
        });
    }
    /**
     * * Marks a property for as unique and indexed in datastore.
     * * Read documentation of Muds.field
     * * For a unique field, presence value cannot become true, if it was false earlier
     * * Level: property declaration
     */
    static unique(presence, typeHint) {
        return this.manager.registerField.bind(this.manager, {
            mandatory: presence === Muds.Man, indexed: true, unique: true, typeHint
        });
    }
    /**
     * * Initialize Muds
     * * entities: All entities must be identified. To facilitate this list is taken as dummy input
     * * Level: property declaration
     */
    static init(rc, gcloudEnv, trRedis, namespace) {
        return this.manager.init(rc, gcloudEnv, trRedis, namespace);
    }
    static async transaction(rc, callback) {
        return await new muds_io_1.MudsTransaction(rc, this.manager, callback).run();
    }
    static async direct(rc, callback) {
        return await new muds_io_1.MudsDirectIo(rc, this.manager, callback).run();
    }
    /**
     * * Creates a numeric key that can be inserted into db
     * * As JS integer cannot handle full range of DS Integers, we only use
     * * This api is given for consistency in handling keys
     */
    static getIntKey(id) {
        if (id === 0 || id === '0')
            throw ('Zero is an invalid int key');
        return this.manager.getDatastore().int(id);
    }
}
exports.Muds = Muds;
Muds.manager = new muds_manager_1.MudsManager();
(function (Muds) {
    Muds.BaseEntity = muds_base_entity_1.MudsBaseEntity;
    Muds.BaseStruct = muds_base_entity_1.MudsBaseStruct;
    Muds.Transaction = muds_io_1.MudsTransaction;
    Muds.DirectIo = muds_io_1.MudsDirectIo;
    Muds.Query = muds_query_1.MudsQuery;
    Muds.getMpoc = muds_util_1.MudsUtil.getMpoc;
    Muds.NamespaceSeperator = '.';
    let Pk;
    (function (Pk) {
        Pk[Pk["None"] = 0] = "None";
        Pk[Pk["Auto"] = 1] = "Auto";
        /**
         * ** WARNING ** Strongly discouraged when entity has no parent,
         * contiguous numbers create hot tablets.
        */
        Pk[Pk["Numeric"] = 2] = "Numeric";
        Pk[Pk["String"] = 3] = "String";
    })(Pk = Muds.Pk || (Muds.Pk = {}));
    Muds.Man = 'mandatory';
    Muds.Opt = 'optional';
    Muds.Asc = 'ascending';
    Muds.Dsc = 'descending';
    Muds.Error = Object.freeze({
        RNF: 'RECORD_NOT_FOUND'
    });
})(Muds = exports.Muds || (exports.Muds = {}));
//# sourceMappingURL=muds.js.map