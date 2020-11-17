# KarabinerBluetoothKeyboardLocationUpdater
Set of scripts to be used in a daemon or cronjob that updates the Karabiner json watching the location of the Bluetooth keyboard

# Usage
To use this script you must supply one and only one argument which is the path to the config json file for Karabiner.  The file will be updated in place to the location id of the bluetooth device.  This VERY LIKELY needs to be updated to match your system.  I have no idea how your keyboard(s) will show up in ioreg.  You should modify this script to remove the writeFileSync line so you don't overwrite your config while testing.

```
./build/index.js /Users/andrewjanian/.config/karabiner/karabiner.json
[2020-11-17T08:34:18.252] [INFO] default - Updating /Users/andrewjanian/.config/karabiner/karabiner.json
[2020-11-17T08:34:18.299] [INFO] default - Updated 1638157034 in /Users/andrewjanian/.config/karabiner/karabiner.json
```