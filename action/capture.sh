
#
#
#

capture () {

	echo 0,0 "${1}" | grim -g - -t png "${1}.png"

}

#
#
#

sleep 1

#

capture 640x400
capture 440x280
capture 920x680

capture 1400x560
