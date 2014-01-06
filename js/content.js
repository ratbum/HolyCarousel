window.requestFileSystem = window.requestFileSystem || window.webkitRequestFileSystem;
var ma_fs = null;

var ma = {};
ma.ALWAYS_OVERWRITE_TEXT = false; //determines whether content title, keywords, description are always overwritten
ma.PERSIST_FILE = 'tagging.json';
ma.SELECT_DEFAULTS = ['N/A', 'English (US)'];
ma.SITE_COLLECTION = false;
ma.URL = document.URL;

//Everything has 2 ids because Microsoft, in their wisdom, decided that SiteCollectionImages & SiteCollectionDocuments should be different in insignificant and irritating ways.
//The first ID is for SiteCollectionImages, the second is for SiteCollectionDocuments

if ( new Uri(ma.URL).path().toLowerCase().indexOf('sitecollection') !== -1 ) {
  ma.SITE_COLLECTION = true;
};

if (ma.SITE_COLLECTION) {
  ma.FIELD_NAME_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl00_ctl00_ctl00_ctl04_ctl00_ctl00_onetidIOFile";
  ma.FIELD_NAME_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl00_ctl00_ctl00_ctl04_ctl00_ctl00_onetidIOFile";
  ma.FIELD_NAME = document.getElementById(ma.FIELD_NAME_ID) || document.getElementById(ma.FIELD_NAME_ID2);

  var tmp = ma.FIELD_NAME.parentNode.textContent;
  ma.FILE_TYPE = tmp.substr(tmp.indexOf('.') + 1) || tmp;

  ma.FIELD_TITLE_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl01_ctl00_ctl00_ctl04_ctl00_ctl00_TextField";
  ma.FIELD_TITLE_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl01_ctl00_ctl00_ctl04_ctl00_ctl00_TextField";
  ma.FIELD_TITLE = document.getElementById(ma.FIELD_TITLE_ID) || document.getElementById(ma.FIELD_TITLE_ID2);

  ma.SELECT_CONTENT_TYPE_RCR_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl02_ctl00_ctl00_ctl04_ctl00_acnmetadata_dropdown";
  ma.SELECT_CONTENT_TYPE_RCR_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl02_ctl00_ctl00_ctl04_ctl00_acnmetadata_dropdown";
  ma.SELECT_CONTENT_TYPE_RCR = document.getElementById(ma.SELECT_CONTENT_TYPE_RCR_ID) || document.getElementById(ma.SELECT_CONTENT_TYPE_RCR_ID2);

  ma.TREE_CONTENT_INDICATOR_RCR_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl03_ctl00_ctl00_ctl04_ctl00_acnmetadatan0Nodes";
  ma.TREE_CONTENT_INDICATOR_RCR_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl03_ctl00_ctl00_ctl04_ctl00_acnmetadatan0Nodes";
  ma.TREE_CONTENT_INDICATOR_RCR = document.getElementById(ma.TREE_CONTENT_INDICATOR_RCR_ID) || document.getElementById(ma.TREE_CONTENT_INDICATOR_RCR_ID2);

  ma.TREE_INDUSTRY_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl04_ctl00_ctl00_ctl04_ctl00_acnmetadatan0Nodes";
  ma.TREE_INDUSTRY_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl04_ctl00_ctl00_ctl04_ctl00_acnmetadatan0Nodes";
  ma.TREE_INDUSTRY = document.getElementById(ma.TREE_INDUSTRY_ID) || document.getElementById(ma.TREE_INDUSTRY_ID2);

  ma.TREE_GROWTH_PLATFORM_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl05_ctl00_ctl00_ctl04_ctl00_acnmetadatan0Nodes";
  ma.TREE_GROWTH_PLATFORM_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl05_ctl00_ctl00_ctl04_ctl00_acnmetadatan0Nodes";
  ma.TREE_GROWTH_PLATFORM = document.getElementById(ma.TREE_GROWTH_PLATFORM_ID) || document.getElementById(ma.TREE_GROWTH_PLATFORM_ID2);

  ma.TREE_LOCATION_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl06_ctl00_ctl00_ctl04_ctl00_acnmetadatan0Nodes";
  ma.TREE_LOCATION_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl06_ctl00_ctl00_ctl04_ctl00_acnmetadatan0Nodes";
  ma.TREE_LOCATION = document.getElementById(ma.TREE_LOCATION_ID) || document.getElementById(ma.TREE_LOCATION_ID2);

  ma.FIELD_CONTENT_TITLE_RCR_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl07_ctl00_ctl00_ctl04_ctl00_ctl00_TextField";
  ma.FIELD_CONTENT_TITLE_RCR_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl07_ctl00_ctl00_ctl04_ctl00_ctl00_TextField";
  ma.FIELD_CONTENT_TITLE_RCR = document.getElementById(ma.FIELD_CONTENT_TITLE_RCR_ID) || document.getElementById(ma.FIELD_CONTENT_TITLE_RCR_ID2);

  ma.FIELD_DESCRIPTION_RCR_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl08_ctl00_ctl00_ctl04_ctl00_ctl00_TextField";
  ma.FIELD_DESCRIPTION_RCR_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl08_ctl00_ctl00_ctl04_ctl00_ctl00_TextField";
  ma.FIELD_DESCRIPTION_RCR = document.getElementById(ma.FIELD_DESCRIPTION_RCR_ID) || document.getElementById(ma.FIELD_DESCRIPTION_RCR_ID2);

  ma.FIELD_KEYWORDS_RCR_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl09_ctl00_ctl00_ctl04_ctl00_ctl00_TextField";
  ma.FIELD_KEYWORDS_RCR_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl09_ctl00_ctl00_ctl04_ctl00_ctl00_TextField";
  ma.FIELD_KEYWORDS_RCR = document.getElementById(ma.FIELD_KEYWORDS_RCR_ID) || document.getElementById(ma.FIELD_KEYWORDS_RCR_ID2);

  ma.SELECT_LANGUAGE_ID = "ctl00_m_g_15b2f371_01a7_45e2_91a8_c575c53633da_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl10_ctl00_ctl00_ctl04_ctl00_acnmetadata_dropdown";
  ma.SELECT_LANGUAGE_ID2 = "ctl00_m_g_8e66dbb1_4bd7_4a86_8532_a988fcb17caf_ctl00_ctl02_ctl00_ctl01_ctl00_ctl00_ctl10_ctl00_ctl00_ctl04_ctl00_acnmetadata_dropdown";
  ma.SELECT_LANGUAGE = document.getElementById(ma.SELECT_LANGUAGE_ID) || document.getElementById(ma.SELECT_LANGUAGE_ID2);
}
ma.FIELD_SHORT_URL = document.getElementsByName("ctl00$PlaceHolderMain$edit_control_fields$Metadata_ShortenedUrl$ctl00$TextField");




var ma_duplicate_name = function(field_obj) {
  "use strict";
  var target_fields = arguments[1] || [ma.FIELD_CONTENT_TITLE_RCR, ma.FIELD_DESCRIPTION_RCR, ma.FIELD_KEYWORDS_RCR];
  for (var i = 0; i < target_fields.length; i++) {
    target_fields[i].value = field_obj.value;
  };
};


var ma_set_tree = function(tree_obj, strs_to_check) {
  "use strict";
  var all_checkboxes = tree_obj.querySelectorAll('input[type=checkbox]');

  for (var i = 0; i < all_checkboxes.length; i++) {
    for (var j = 0; j < strs_to_check.length; j++) {
      if (all_checkboxes[i].parentNode.textContent.trim() == strs_to_check[j]) {
        all_checkboxes[i].checked = true;
        j = strs_to_check.length;
      } else {
        all_checkboxes[i].checked = false;
      }
    }
  }

};

var ma_reset_tree = function(tree_obj) {
  "use strict";
  var all_checkboxes = tree_obj.querySelectorAll('input[type=checkbox]');

  for (var i = 0; i < all_checkboxes.length; i++) {
    var parent = all_checkboxes[i].parentNode;

    var directchild = true;
    //check whether the checkbox is on the first level
    while (parent.id !== tree_obj.id && directchild) {
      if (parent.nodeName.toLowerCase() === 'div') directchild = false;
      parent = parent.parentNode;
    }

    if (directchild && all_checkboxes[i].parentNode.textContent.trim() === "N/A") {
      all_checkboxes[i].checked = true;
    } else {
      all_checkboxes[i].checked = false;
    }
  };

};

var ma_get_tree = function(tree_obj) {
  "use strict";
  var all_checkboxes = tree_obj.querySelectorAll('input[type=checkbox]');
  var checked_vals = [];
  for (var i = 0; i < all_checkboxes.length; i++) {
    if (all_checkboxes[i].checked) {
      checked_vals.push(all_checkboxes[i].parentNode.textContent.trim());
    }
  }
  return checked_vals;
};

var ma_set_select = function(select_obj, str_to_select) {
  "use strict";
  var all_options = select_obj.getElementsByTagName('option');

  for (var i = 0; i < all_options.length; i++) {
    if (all_options[i].textContent.trim() == str_to_select) {
      all_options[i].selected = true;
    } else {
      all_options[i].selected = false;
    }
  }
};

var ma_reset_select = function(select_obj) {
  "use strict";
  var all_options = select_obj.getElementsByTagName('option');

  var select_default_index = ma.SELECT_DEFAULTS.length;
  var select_index = -1;
  for (var i = 0; i < all_options.length; i++) {
    //Check through SELECT_DEFAULTS in order of preference. Keep using the one that is matched first.
    for (var j = 0; j < ma.SELECT_DEFAULTS.length; j++) {
      select_index = (select_default_index == ma.SELECT_DEFAULTS.length) ? j : select_default_index;
      if (all_options[i].textContent.trim() == ma.SELECT_DEFAULTS[select_index]) {
        all_options[i].selected = true;
        select_default_index = select_index;
      } else {
        all_options[i].selected = false;
      }
    }
  };

};

var ma_get_select = function(select_obj) {
  "use strict";
  var all_options = select_obj.getElementsByTagName('option');

  for (var i = 0; i < all_options.length; i++) {
    if (all_options[i].selected) {
      return all_options[i].textContent.trim();
    }
  }

};

var ma_reset = function(event) {
  "use strict";
  console.log('resetting');

  ma_reset_tree(ma.TREE_CONTENT_INDICATOR_RCR);
  ma_reset_tree(ma.TREE_INDUSTRY);
  ma_reset_tree(ma.TREE_GROWTH_PLATFORM);
  ma_reset_tree(ma.TREE_LOCATION);
  ma_duplicate_name(ma.FIELD_NAME);

  ma_reset_select(ma.SELECT_CONTENT_TYPE_RCR);
  ma_reset_select(ma.SELECT_LANGUAGE);
};

var ma_save = function(event) {
  "use strict";
  console.log('saving');
  console.info(ma_objectify_state());
  console.log(JSON.stringify(ma_objectify_state(), null));
  ma_deletefile(ma_fs, ma.PERSIST_FILE, function() {
    ma_writefile(ma_fs, ma.PERSIST_FILE, JSON.stringify(ma_objectify_state(), null));
  });
};
var ma_load = function(event) {
  "use strict";
  console.log('loading');
  ma_readfile(ma_fs, ma.PERSIST_FILE, function(response) {
    console.info(response.result);
    ma_deobjectify_state(JSON.parse(response.result));
  });
};

var ma_createfile = function(fs, filename, callback) {
  "use strict";
  if (!fs) return;
  console.log('creating');
  fs.root.getFile(filename, {
    create: true,
    exclusive: true
  }, function(fileEntry) {
    callback();
  }, ma_fileErrorHandler);
}

var ma_readfile = function(fs, filename, callback) {
  "use strict";
  if (!fs) return;
  console.log('reading');
  fs.root.getFile(filename, {}, function(fileEntry) {

    // Get a File object representing the file,
    // then use FileReader to read its contents.
    fileEntry.file(function(file) {
      var reader = new FileReader();

      reader.onloadend = function(e) {
        callback(this);
      };

      reader.readAsText(file);
    }, ma_fileErrorHandler);

  }, ma_fileErrorHandler);
};

var ma_writefile = function(fs, filename, content) {
  "use strict";
  if (!fs) return;
  console.log('writing');
  fs.root.getFile(filename, {
    create: true
  }, function(fileEntry) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function(fileWriter) {

      fileWriter.onwriteend = function(e) {
        console.log('Write completed.');
      };

      fileWriter.onerror = function(e) {
        console.log('Write failed: ' + e.toString());
      };

      var blob = new Blob([content], {
        type: 'text/plain'
      });

      fileWriter.write(blob);

    }, ma_fileErrorHandler);

  }, ma_fileErrorHandler);
};

var ma_deletefile = function(fs, filename, callback) {
  "use strict";
  if (!fs) return;
  fs.root.getFile(filename, {
    create: true
  }, function(fileEntry) {
    fileEntry.remove(callback, ma_fileErrorHandler);
  }, ma_fileErrorHandler);
}

var ma_objectify_state = function() {
  "use strict";
  var s = {};
  s.field_name_val = ma.FIELD_NAME.value;
  s.field_title_val = ma.FIELD_TITLE.value;
  s.select_content_type_rcr_val = ma_get_select(ma.SELECT_CONTENT_TYPE_RCR);
  s.tree_content_indicator_rcr_val = ma_get_tree(ma.TREE_CONTENT_INDICATOR_RCR);
  s.tree_industry_val = ma_get_tree(ma.TREE_INDUSTRY);
  s.tree_growth_platform_val = ma_get_tree(ma.TREE_GROWTH_PLATFORM);
  s.tree_location_val = ma_get_tree(ma.TREE_LOCATION);
  s.field_content_title_rcr_val = ma.FIELD_CONTENT_TITLE_RCR.value;
  s.field_description_rcr_val = ma.FIELD_DESCRIPTION_RCR.value;
  s.field_keywords_rcr_val = ma.FIELD_KEYWORDS_RCR.value;
  s.select_language_val = ma_get_select(ma.SELECT_LANGUAGE);
  return s;
};

var ma_deobjectify_state = function(s) {
  "use strict";
  //s.field_name_val
  //s.field_title_val
  ma_set_select(ma.SELECT_CONTENT_TYPE_RCR, s.select_content_type_rcr_val);
  ma_set_tree(ma.TREE_CONTENT_INDICATOR_RCR, s.tree_content_indicator_rcr_val);
  ma_set_tree(ma.TREE_INDUSTRY, s.tree_industry_val);
  ma_set_tree(ma.TREE_GROWTH_PLATFORM, s.tree_growth_platform_val);
  ma_set_tree(ma.TREE_LOCATION, s.tree_location_val);
  if (ma.ALWAYS_OVERWRITE_TEXT) {
    ma.FIELD_CONTENT_TITLE_RCR.value = s.field_content_title_rcr_val;
    ma.FIELD_DESCRIPTION_RCR.value = s.field_description_rcr_val;
    ma.FIELD_KEYWORDS_RCR.value = s.field_keywords_rcr_val;
  } else {
    if (s.field_name_val !== s.field_content_title_rcr_val) {
      ma.FIELD_CONTENT_TITLE_RCR.value = s.field_content_title_rcr_val;
    }
    if (s.field_name_val !== s.field_description_rcr_val) {
      ma.FIELD_DESCRIPTION_RCR.value = s.field_description_rcr_val;
    }
    if (s.field_name_val !== s.field_keywords_rcr_val) {
      ma.FIELD_KEYWORDS_RCR.value = s.field_keywords_rcr_val;
    }
  }
  ma_set_select(ma.SELECT_LANGUAGE, s.select_language_val);
  return s;
};

var ma_detect_change = function() {
  "use strict";
  console.log('detected a change');
  var inputs = document.getElementsByTagName('input');
  for (var i = 0; i < inputs.length; i++) {
    if (inputs.type === "text" || inputs.type === "password") {};
    inputs[i].name + inputs.value[i];
  }
};

function ma_initSiteCollection() {
  ma.field_name_val = ma.FIELD_NAME.value;

  var sitetitle = document.getElementsByTagName('h1')[0];
  sitetitle.innerHTML = sitetitle.innerHTML + ' (Ameliorated)';

  var top_toolbar = document.querySelector('table.ms-formtoolbar');

  var reset_button = document.createElement('a');
  reset_button.style.marginLeft = "9em";
  reset_button.style.marginRight = "10px";
  reset_button.innerHTML = "Reset";
  reset_button.onclick = ma_reset;
  reset_button.className = "ma_button";
  reset_button.id = "ma_reset";

  var save_button = document.createElement('a');
  save_button.style.marginRight = "2px";
  save_button.innerHTML = "Save";
  save_button.onclick = ma_save;
  save_button.className = "ma_button";
  save_button.id = "ma_save";

  var load_button = document.createElement('a');
  load_button.style.marginRight = "2px";
  load_button.innerHTML = "Load";
  load_button.onclick = ma_load;
  load_button.className = "ma_button";
  load_button.id = "ma_load";

  var toolbar_space = top_toolbar.getElementsByTagName('td')[0];
  toolbar_space.removeChild(toolbar_space.getElementsByTagName('img')[0]);
  top_toolbar.getElementsByTagName('td')[0].appendChild(reset_button);
  top_toolbar.getElementsByTagName('td')[0].appendChild(save_button);
  top_toolbar.getElementsByTagName('td')[0].appendChild(load_button);

  ma.FIELD_NAME.onkeyup = function() {
    var targets = [];
    if (ma.FIELD_CONTENT_TITLE_RCR.value.length == 0 || ma.field_name_val == ma.FIELD_CONTENT_TITLE_RCR.value) {

      targets.push(ma.FIELD_CONTENT_TITLE_RCR);
    }
    if (ma.FIELD_DESCRIPTION_RCR.value.length == 0 || ma.field_name_val == ma.FIELD_DESCRIPTION_RCR.value) {
      targets.push(ma.FIELD_DESCRIPTION_RCR);
    }
    if (ma.FIELD_KEYWORDS_RCR.value.length == 0 || ma.field_name_val == ma.FIELD_KEYWORDS_RCR.value) {
      targets.push(ma.FIELD_KEYWORDS_RCR);
    }
    ma_duplicate_name(ma.FIELD_NAME, targets);
    ma.field_name_val = ma.FIELD_NAME.value;
  };

  var inputs = document.getElementsByTagName('input');

  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onchange = ma_detect_change;
  }
}

function ma_initPageEdit() {
  if(!ma.FIELD_SHORT_URL.value) {
    var url = new Uri(ma.URL);
    var path = url.path();
    var host = url.host();
    var short_url;
    if (host.indexOf('careers') == -1) {
      short_url = "acn"+ path.replace('/', ':').replace(/\.aspx.*/,'');
    } else {
      short_url = "car"+ path.replace('/', ':').replace(/\.aspx.*/,'');
    }
    short_url.replace('microsite', 'microsites');
    ma.FIELD_SHORT_URL.value = short_url;
    //unless host() includes 'careers.', then it's car:
  }
  
}

(function() {
  "use strict";
  console.log('HIYYYAAAA!')
  // Initiate filesystem on page load.
  if (window.requestFileSystem) {
    ma_init_fs();
  }
  
  if (ma.SITE_COLLECTION) {
    ma_initSiteCollection();
  } else if (ma.FIELD_SHORT_URL) {
    ma_initPageEdit();
  }
    
})();





function ma_fileErrorHandler(e) {
  "use strict";
  var msg = '';
  switch (e.code) {
  case FileError.QUOTA_EXCEEDED_ERR:
    msg = 'QUOTA_EXCEEDED_ERR';
    break;
  case FileError.NOT_FOUND_ERR:
    msg = 'NOT_FOUND_ERR';
    break;
  case FileError.SECURITY_ERR:
    msg = 'SECURITY_ERR';
    break;
  case FileError.INVALID_MODIFICATION_ERR:
    msg = 'INVALID_MODIFICATION_ERR';
    break;
  case FileError.INVALID_STATE_ERR:
    msg = 'INVALID_STATE_ERR';
    break;
  default:
    msg = 'Unknown Error';
    break;
  };
  console.error('MOSS Ameliorator Error: ' + msg);
}

function ma_init_fs() {
  "use strict";
  //request 8 KB for file storage
  window.requestFileSystem(window.TEMPORARY, 1024 * 8, function(filesystem) {
    ma_fs = filesystem;
  }, ma_fileErrorHandler);
}
