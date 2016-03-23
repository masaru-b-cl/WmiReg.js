WmiReg.js
=====

Edit registry entry via WMI (StdRegProv) on JScript.

## Install

Using on WSH file(*.wsf), add `script` tag has `src` attribute is path to `WmiReg.js` (see `wsf\test.wsf`).

## Usage

```xml
<?xml version="1.0" encoding="utf-8" ?>
<job>
  <script src="path/to/WmiReg.js"></script>
  <script language="JScript">
    var wmiReg = new WmiReg();
    
    var defKey = WmiReg.DefKey.HKEY_LOCAL_MACHINE;
    var subKeyName = "SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion";
    var valueName = "SystemRoot"

    var value = wmiReg.getStringValue(defKey, subKeyName, valueName);

    WScript.Echo(value);
  </script>
</job>
```

## Test

My test is using [QUnit](https://qunitjs.com/). See `test\QUnitTest.html` and browse on IE.