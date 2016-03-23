/*
 * WmiReg.js - Edit registry entry via Wmi (StdRegProv) on JScript.
 * 
 * Copyright (c) 2016 TAKANO Sho / @masaru_b_cl
 * Licensed under the MIT license.
 *   https://github.com/masaru-b-cl/WmiReg.js/blob/master/LICENSE.txt
 * 
 * Version 1.0.0
 */
var WmiReg = function (strServer) {
  var locator = new ActiveXObject("WbemScripting.SWbemLocator");

  if (strServer == null) {
    strServer = "localhost";
  }

  var services = locator.ConnectServer(strServer, "root/default");
  var stdregprov = services.Get("StdRegProv");

  function getStdRegProv() {
    return stdregprov;
  }

  function getDefKeyName(hDefKey) {
    for (var key in WmiReg.DefKey) {
      if (WmiReg.DefKey[key] === hDefKey) {
        return key;
      }
    }
    return "";
  }

  this.hasKey = function (hDefKey, sSubKeyName) {
    var stdregprov = getStdRegProv();
    var methodName = "EnumKey";
    var method = stdregprov.Methods_.Item(methodName);
    var inParams = method.InParameters.SpawnInstance_();
    inParams.hDefKey = hDefKey;
    inParams.sSubKeyName = sSubKeyName;

    var result = stdregprov.ExecMethod_(methodName, inParams);

    var returnValue = result.ReturnValue;

    if (returnValue == 0) {
      return true;
    } else if (returnValue == 2) {
      return false;
    }
  };

  this.createKey = function (hDefKey, sSubKeyName) {
    var stdregprov = getStdRegProv();
    var methodName = "CreateKey";
    var method = stdregprov.Methods_.Item(methodName);
    var inParams = method.InParameters.SpawnInstance_();
    inParams.hDefKey = hDefKey;
    inParams.sSubKeyName = sSubKeyName;

    stdregprov.ExecMethod_(methodName, inParams);
  };

  this.hasValue = function (hDefKey, sSubKeyName, sValueName) {
    var stdregprov = getStdRegProv();
    var methodName = "EnumValues";
    var method = stdregprov.Methods_.Item(methodName);
    var inParams = method.InParameters.SpawnInstance_();
    inParams.hDefKey = hDefKey;
    inParams.sSubKeyName = sSubKeyName;

    var result = stdregprov.ExecMethod_(methodName, inParams);

    var returnValue = result.ReturnValue;

    if (returnValue == 0) {
      if (result.sNames == null) {
        return false;
      }

      var valueNames = result.sNames.toArray();
      var cnt = valueNames.length;
      for (var i = 0; i < cnt; i++) {
        if (valueNames[i] == sValueName) {
          return true;
        }
      }
      return false;

    } else if (returnValue == 1) {
      return false;
    }
  };

  this.getStringValue = function (hDefKey, sSubKeyName, sValueName) {
    var stdregprov = getStdRegProv();
    var methodName = "GetStringValue";
    var method = stdregprov.Methods_.Item(methodName);
    var inParams = method.InParameters.SpawnInstance_();
    inParams.hDefKey = hDefKey;
    inParams.sSubKeyName = sSubKeyName;
    inParams.sValueName = sValueName;

    var result = stdregprov.ExecMethod_(methodName, inParams);

    var returnValue = result.ReturnValue;
    if (returnValue != 0) {
      raiseError("GetStringValue", "DefKey=" + getDefKeyName(hDefKey)
        + ", KeyName=" + sSubKeyName
        + ", ValueName=" + sValueName
        + ", ReturnValue=" + returnValue
        );
    };

    return result.sValue;
  };

  this.setStringValue = function (hDefKey, sSubKeyName, sValueName, sValue) {
    var stdregprov = getStdRegProv();
    var methodName = "SetStringValue";
    var method = stdregprov.Methods_.Item(methodName);
    var inParams = method.InParameters.SpawnInstance_();
    inParams.hDefKey = hDefKey;
    inParams.sSubKeyName = sSubKeyName;
    inParams.sValueName = sValueName;
    inParams.sValue = sValue;

    var result = stdregprov.ExecMethod_(methodName, inParams);

    var returnValue = result.ReturnValue;
    if (returnValue != 0) {
      raiseError("SetStringValue", "ReturnValue=" + returnValue);
    };
  };

  function raiseError(methodName, description) {
    throw {
      "methodName": methodName,
      "description": description,
      "toString": function () {
        return "methodName: " + methodName + ", description: " + description;
      }
    };
  }
};

WmiReg.DefKey = {};
WmiReg.DefKey.HKEY_CLASSES_ROOT = 0x80000000;
WmiReg.DefKey.HKEY_CURRENT_USER = 0x80000001;
WmiReg.DefKey.HKEY_LOCAL_MACHINE = 0x80000002;
WmiReg.DefKey.HKEY_USERS = 0x80000003;
WmiReg.DefKey.HKEY_CURRENT_CONFIG = 0x80000005;
