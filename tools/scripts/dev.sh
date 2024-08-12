#!/bin/bash

pc_port=$1
arg_action=$2
arg_app=$3

apps=$(find "apps" -maxdepth 1 -mindepth 1 -type d -exec basename {} \;)
apps+=( "temporal" )
actions=$(cat ./tools/scripts/.dev-commands)

if [[ -z "$arg_action" ]]; then
	action=$(printf "$actions" | fzf --reverse)
elif [[ "$2" == "--help" ]] || ! echo "$actions" | grep -qwb "$arg_action"; then
	echo "Usage: dev <action>"
	echo ""
	echo "Available actions:"
	echo "$actions"
	exit 1
else
	action="$arg_action"
fi

if [[ -z $action ]]; then
	exit 1
elif ! [[ "$action" == "start" || "$action" == "restart" || "$action" == "stop" || "$action" == "up" ]]; then
	eval "$action"
	exit 1
fi

if [[ "$action" == "up" ]]; then
	eval "devenv up"
	exit 0
fi

appOptions=$(printf "%s\n" "${apps[@]}")

if [[ -z "$arg_app" ]]; then
	selected=$(printf "$appOptions" | sort | fzf --multi --reverse)
elif ! echo "$appOptions" | grep -qwb "$arg_app"; then
	echo "Usage: dev $action"
	echo ""
	echo "Available apps:"
	echo "$appOptions"
	exit 1
else
	selected="$arg_app"
fi

if [[ -n "$selected" && -n "$action" ]]; then
	for app in $selected; do
		# Check if the file exists
		if [ ! -d "$HOME/Library/Application Support/process-compose" ]; then
		    mkdir -p "$HOME/Library/Application Support/process-compose"
		    touch "$HOME/Library/Application Support/process-compose/settings.yaml"
		fi
		process-compose --unix-socket $pc_port process $action $app
	done
fi


