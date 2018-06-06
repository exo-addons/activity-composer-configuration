@Scripts(location = AssetLocation.SERVER,
value = {
        @Script(id = "jquery", value = "javascript/commons/jquery/jquery-1.12.3.js"),
        @Script(id = "angularjs", value = "javascript/commons/angular/angular.min.js"),
        @Script(id = "composer-configuration-portlet-js", value = "javascript/activity-composer-configuration-portlet.js", depends="angularjs")
})

@Stylesheets( location = AssetLocation.SERVER,
value = {
        @Stylesheet(id = "composer-configuration-portlet-css", value = "skin/css/activity-composer-configuration-portlet.css")
})


@Assets("*")
@Application
@Portlet(name="ActivityComposerConfigurationPortlet")
@Bindings({@Binding(ActivityComposerConfigurationService.class)})
package org.exoplatform.portlets.activityComposerConfiguration;

import juzu.Application;
import juzu.asset.AssetLocation;
import juzu.plugin.asset.Assets;
import juzu.plugin.asset.Script;
import juzu.plugin.asset.Scripts;
import juzu.plugin.asset.Stylesheet;
import juzu.plugin.asset.Stylesheets;
import juzu.plugin.binding.Binding;
import juzu.plugin.binding.Bindings;
import juzu.plugin.portlet.Portlet;

import org.exoplatform.service.ActivityComposerConfigurationService;

