package org.exoplatform.portlets.activityComposerConfiguration;

import java.util.List;

import javax.inject.Inject;

import juzu.Path;
import juzu.Resource;
import juzu.Response;
import juzu.View;
import juzu.plugin.ajax.Ajax;
import juzu.template.Template;

import org.json.JSONArray;
import org.json.JSONObject;

import org.exoplatform.service.ActivityComposerConfigurationService;
import org.exoplatform.services.log.ExoLogger;
import org.exoplatform.services.log.Log;
import org.exoplatform.social.core.space.model.Space;


public class ActivityComposerConfigurationController {

    private static Log log = ExoLogger.getLogger(ActivityComposerConfigurationController.class);
    private static final String NAME = "name";
    private static final String LABEL = "label";
    private static final String SPACES_WITH_ACTIVITY_COMPOSER = "spacesWithActivityComposer";
    
    @Inject
    @Path("index.gtmpl")
    Template index;
    
    @Inject
    ActivityComposerConfigurationService activityComposerConfigurationService;
    
    @View
    public Response.Content index() throws Exception {
      return index.ok();
    }
    
    @Ajax
    @Resource
    public Response getSpacesWithoutActivityComposer() {
      JSONObject jsonGlobal = new JSONObject();
      try {
        List<Space> listSpacesWithoutActivityComposer = activityComposerConfigurationService.getListSpacesWithoutActivityComposer();
        JSONArray jsonArray = new JSONArray();
        for(Space spaceWithoutActivityComposer : listSpacesWithoutActivityComposer) {
          JSONObject json = new JSONObject();
          json.put(NAME, spaceWithoutActivityComposer.getPrettyName());
          json.put(LABEL, spaceWithoutActivityComposer.getDisplayName());
          jsonArray.put(json);
        }
        jsonGlobal.put(ActivityComposerConfigurationService.SPACES_WITHOUT_ACTIVITY_COMPOSER, jsonArray);
      } catch (Exception e) {
        log.error("Cannot get spaces without activity composer", e);
      }
      return Response.ok(jsonGlobal.toString());
    }
    
    @Ajax
    @Resource
    public Response getSpacesWithActivityComposer() {
      JSONObject jsonGlobal = new JSONObject();
      try {
        List<Space> listSpacesWithActivityComposer = activityComposerConfigurationService.getListSpacesWithActivityComposer();
        JSONArray jsonArray = new JSONArray();
        for(Space spaceWithActivityComposer : listSpacesWithActivityComposer) {
          JSONObject json = new JSONObject();
          json.put(NAME, spaceWithActivityComposer.getPrettyName());
          json.put(LABEL, spaceWithActivityComposer.getDisplayName());
          jsonArray.put(json);
        }
        jsonGlobal.put(SPACES_WITH_ACTIVITY_COMPOSER, jsonArray);
      } catch (Exception e) {
        log.error("Cannot get spaces with activity composer", e);
      }
      return Response.ok(jsonGlobal.toString());
    }
    
    
    @Ajax
    @Resource
    public Response getUserActivityComposerState() {
      JSONObject jsonGlobal = new JSONObject();
      try {
        String userActivityComposerState = activityComposerConfigurationService.getUserActivityComposerState();
        jsonGlobal.put(ActivityComposerConfigurationService.HIDE_USER_ACTIVITY_COMPOSER, userActivityComposerState);
      } catch (Exception e) {
        log.error("Cannot get user activity composer state", e);
      }
      return Response.ok(jsonGlobal.toString());
    }
    
    @Ajax
    @Resource
    public Response hideSpaceActivityComposer(String spaces) {
      activityComposerConfigurationService.hideSpaceActivityComposer(spaces);
      return Response.ok();
    }
    
    @Ajax
    @Resource
    public Response showSpaceActivityComposer(String spaces) {
      activityComposerConfigurationService.showSpaceActivityComposer(spaces);
      return Response.ok();
    }
    
    @Ajax
    @Resource
    public Response showHideUserActivityComposer(String hideUserActivityComposer) {
      activityComposerConfigurationService.showHideUserActivityComposer(hideUserActivityComposer);
      return Response.ok();
    }
}
