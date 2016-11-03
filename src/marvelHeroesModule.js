/** @type {InhabitModuleBase} */
var InhabitModuleBase = require('inhabit-module-base').InhabitModuleBase;
var DefaultConfiguration = require('./defaultConfiguration');
var marvelHeroesView = require('./marvelHeroesView.hbs');
var SemanticContext = require('./SemanticContext');
var MarvelAPI = require('./MarvelAPI');
var _filter = require('lodash/filter');

/**
 * @extends {InhabitModuleBase}
 * @param configuration
 * @param dependencies
 * @constructor
 */
var marvelHeroes = function (configuration, dependencies) {
    InhabitModuleBase.prototype.constructor.call(this, configuration, dependencies);
    this.configuration = dependencies.$.extend(true, {}, DefaultConfiguration);
    this.semanticContext = new SemanticContext(this.textClassificationService);
    this.marvelAPI = new MarvelAPI(this.$);
    this.contentDeferred = this.$.Deferred();
    this.entities = [];
    this.hasContentData = false;
    this.model = {}
};

marvelHeroes.prototype = Object.create(InhabitModuleBase.prototype);
marvelHeroes.prototype.constructor = marvelHeroes;
marvelHeroes.moduleName = "marvelheroes";
/**
 * Start async task that fetches content and return a this.deffered.promise()
 * @returns {Promise}
 */
marvelHeroes.prototype.getContent = function () {
    //first of all lets call semantic service first and get all keywords
    this.semanticContext.getEntities()
        //if all is good let's go to next step
        .then(this.parseSemanticResultsAndGoToNextStep.bind(this))
        .fail(this.resolveContentPromise.bind(this));
    return this.contentDeferred.promise();
};

marvelHeroes.prototype.parseSemanticResultsAndGoToNextStep =function (entities) {
    //let's filter entities by person because this who we are looking for
    this.entities = _filter(entities, {type: "Person"});
    if (this.entities.length > 0)
    {
        //try to match preson to hero from marvel API
        this.findHero();
    }
    else {
        //if nothing to check let's return control back to inhabit core
        this.resolveContentPromise();
    }
};

marvelHeroes.prototype.resolveContentPromise = function(){
    this.contentDeferred.resolve(this);
};

marvelHeroes.prototype.findHero = function () {
    if (this.entities.length > 0) {
        //let's pick first person in the list
        var entity = this.entities.shift();
        //pick his name
        var heroName = entity.values[0];
        //Try to find matchin hero in marvel databse
        this.marvelAPI.getHeroByName(heroName)
            //if found let's render something
            .then(this.fillModelAndDisplay.bind(this))
            //if no, check next one
            .fail(this.checkNext.bind(this))
    }
};
marvelHeroes.prototype.checkNext = function () {
    if (this.entities.length > 0) {
        this.findHero();
    }
    else {
        this.resolveContentPromise();
    }
};

marvelHeroes.prototype.fillModelAndDisplay=function(data){
    //fill model with data and trigger display method
    this.model = data;
    this.hasContentData = true;

    this.resolveContentPromise();
};
/**
 * Return a Thumbnail URL
 * @returns {string}
 * @deprecated
 */
marvelHeroes.prototype.getThumbnail = function () {
    return "";
};

/**
 * Return a Title
 * @returns {string}
 * @deprecated
 */
marvelHeroes.prototype.getTitle = function () {
    return "marvelHeroes";
};

/**
 * @returns {boolean}
 */
marvelHeroes.prototype.hasContent = function () {
    return this.hasContentData;
};

/**
 * Render content
 * @return {string}
 */
marvelHeroes.prototype.display = function () {
    //compile html from the model and return result
    var compiledTemplate = this.handlebars.compile(marvelHeroesView);
    return compiledTemplate(this.model);
};

/**
 * Return a Type
 * @returns {string}
 * @deprecated
 */
marvelHeroes.prototype.getType = function () {
    return marvelHeroes.moduleName;
};

InhabitModuleBase.publish(marvelHeroes);
