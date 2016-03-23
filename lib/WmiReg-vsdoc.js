var WmiReg = function (strServer) {
    /// <param name="strServer" type="String">Computer name to which you are connecting. If the remote computer is in a different domain than the user account under which you log in, then use the fully qualified computer name. If you do not provide this parameter, the call defaults to the local computer.</param>

    this.hasKey = function (hDefKey, sSubKeyName) {
        /// <param name="hDefKey" type="Number">A registry tree, also known as a hive, that contains the sSubKeyName path. The default value is HKEY_LOCAL_MACHINE.</param>
        /// <param name="sSubKeyName" type="String">A key that contains the named value to be set.</param>
        /// <returns type="bool" />
    }

    this.createKey = function (hDefKey, sSubKeyName) {
        /// <param name="hDefKey" type="Number">A registry tree, also known as a hive, that contains the sSubKeyName path. The default value is HKEY_LOCAL_MACHINE.</param>
        /// <param name="sSubKeyName" type="String">The key to be created. The CreateKey method creates all subkeys specified in the path that do not exist.</param>
        /// <returns type="void" />
    }

    this.hasValue = function (hDefKey, sSubKeyName, sValueName) {
        /// <param name="hDefKey" type="Number">A registry tree, also known as a hive, that contains the sSubKeyName path. The default value is HKEY_LOCAL_MACHINE.</param>
        /// <param name="sSubKeyName" type="String">A key that contains the named value to be set.</param>
        /// <param name="sValueName" type="String">A named value whose data value you are setting. You can specify an existing named value (update) or a new named value (create). Specify an empty string to set the data value for the default named value.</param>
        /// <returns type="bool" />
    }

    this.getStringValue = function (hDefKey, sSubKeyName, sValueName) {
        /// <param name="hDefKey" type="Number">A registry tree, also known as a hive, that contains the sSubKeyName path. The default value is HKEY_LOCAL_MACHINE.</param>
        /// <param name="sSubKeyName" type="String">A key that contains the named value to be set.</param>
        /// <param name="sValueName" type="String">A named value whose data value you are setting. You can specify an existing named value (update) or a new named value (create). Specify an empty string to set the data value for the default named value.</param>
        /// <returns type="String" />
    }

    this.setStringValue = function (hDefKey, sSubKeyName, sValueName, sValue) {
        /// <param name="hDefKey" type="Number">A registry tree, also known as a hive, that contains the sSubKeyName path. The default value is HKEY_LOCAL_MACHINE.</param>
        /// <param name="sSubKeyName" type="String">A key that contains the named value to be set.</param>
        /// <param name="sValueName" type="String">A named value whose data value you are setting. You can specify an existing named value (update) or a new named value (create). Specify an empty string to set the data value for the default named value.</param>
        /// <param name="sValue" type="String">A data value.</param>
    }
};

WmiReg.DefKey = function () {
    /// <field name="HKEY_CLASSES_ROOT"   static="true" type="Number"></field>
    /// <field name="HKEY_CURRENT_USER"   static="true" type="Number"></field>
    /// <field name="HKEY_LOCAL_MACHINE"  static="true" type="Number"></field>
    /// <field name="HKEY_USERS"          static="true" type="Number"></field>
    /// <field name="HKEY_CURRENT_CONFIG" static="true" type="Number"></field>
}