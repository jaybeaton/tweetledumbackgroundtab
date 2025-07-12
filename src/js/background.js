/**
 * Background Processing Script
 *
 * This handles receiving the messages and opening up the new tab
 *
 * @author Aaron Saray (http://aaronsaray.com)
 */

/**
 * Add message listener
 *
 * This will open up a new non-focused tab with the url it was sent
 */
{
	const receiveRequest = (message, sender, response) => {
		chrome.tabs.create({ url: message.url, active: false });
	};
	chrome.runtime.onMessage.addListener(receiveRequest);
}