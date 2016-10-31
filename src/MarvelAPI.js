/**
 * Created by WMTS on 10/31/2016.
 */
///https://developer.marvel.com/docs
var MarvelAPI = function ($) {
    this.$ = $;
    this.apiKey = "{{YOUR_MARVEL_APIKEY}}";
    this.charactersRestUrl = "https://gateway.marvel.com:443/v1/public/characters";
};
MarvelAPI.prototype = {
    getHeroByName: function (name) {
        var deferred = this.$.Deferred();
        this.$.get(
            this.charactersRestUrl,
            {
                apikey: this.apiKey,
                name: name
            }
        )
            .done(function (result) {
                if (this.resultsContainData(result)) {
                    var hero = this.parseData(result.data.results[0]);
                    deferred.resolve(hero);
                }
                else {
                    deferred.reject();
                }

            }.bind(this))
            .fail(function () {
                deferred.reject();
            });
        return deferred.promise();
    },
    resultsContainData: function (result) {
        return result && result.data && result.data.results && result.data.results.length > 0 && result.data.results[0];
    },
    parseData: function (data) {
        var hero = {};
        hero.id = data.id;
        hero.name = data.name;
        hero.thumbnail = data.thumbnail.path + "/portrait_fantastic.jpg";
        hero.description = data.description;
        return hero;
    }
};
module.exports = MarvelAPI;