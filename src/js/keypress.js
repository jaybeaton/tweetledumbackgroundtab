/**
 * This is inserted into the content to handle the letter push
 *
 * @author Aaron Saray (http://aaronsaray.com)
 */
(function(){

	/**
	 * Main feedlybackgroundtab constructor
	 */
	var FBT = function() {

		/**
		 * The default key codea which are ; and '
		 * @type {number}
		 * @private
		 */
		var _triggerKeyCode = 59;
		var _triggerTweetCode = 39;

		/**
		 * Used to create the default key code from local storage
		 * Also modifies the help popup
		 */
		this.init = function() {
			chrome.storage.sync.get('shortcutKey', function(settings) {
				if (settings.shortcutKey) {
					_triggerKeyCode = settings.shortcutKey.charCodeAt(0);
				}
			});
			chrome.storage.sync.get('tweetKey', function(settings) {
				if (settings.tweetKey) {
					_triggerTweetCode = settings.tweetKey.charCodeAt(0);
				}
			});
		};

		/**
		 * handler for key press - must be not in textarea or input and must be not altered
		 * Then it sends extension request
		 * @param e
		 */
		this.keyPressHandler = function(e) {
			var tag = e.target.tagName.toLowerCase();
			if (tag !== 'input' && tag !== 'textarea') {
				if (!e.altKey && !e.ctrlKey) {

					var checked = false;
					var url;

					if (e.keyCode === _triggerKeyCode) {
						checked = true;
						url = document.querySelector('div.active').getAttribute('data-url');
					} else if (e.keyCode === _triggerTweetCode) {
							checked = true;
							url = document.querySelector('div.active').getAttribute('data-tweet');
					}

					if (checked) {
							if (url) {
									chrome.extension.sendMessage({url: url});
							}
							else {
									console.log("Could not find any url.");
							}
					}

				}
			}
		}
	};

	if (window === top) {
		var fbt = new FBT();
		fbt.init();
		window.addEventListener('keypress', fbt.keyPressHandler, false);
	}
})();
