/**
 * Created by WMTS on 10/31/2016.
 */
"use strict";
var SemanticContext = function (textClassificationService) {
    this.service = textClassificationService;
};

SemanticContext.prototype = {
    getEntities: function () {
        return this.service.getEntities('alchemy');
    },
    getKeywords: function () {
        return this.service.getKeywords('alchemy');
    },
    getConcepts: function () {
        return this.service.getConcepts('alchemy');
    },
    getTaxonomy: function () {
        return this.service.getTaxonomy('alchemy');
    }
};
module.exports = SemanticContext;