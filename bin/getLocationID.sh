#!/bin/bash

#TODO #1 take some params to filter the "right" one but one my system there is only one that matches the IOBluetoothHIDDriver class

locationID=$(/usr/sbin/ioreg -r -c IOBluetoothHIDDriver -d 1 -k LocationID | grep LocationID | sed 's/.*\"LocationID\" = \([0-9]*\)/\1/g')

#TODO #2 do some checking to make sure it isn't empty, exit code of command, etc.

echo $locationID
