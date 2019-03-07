var user;
var repos;
var status;
var gitddb = false;
var config_file_path = '/git-ddb-ankurparihar.json';
var config_data = {};
var config_file_sha = '';

var config_flags = {
	"sign": "",
	"getUser": false,
	"checkGDDBRepo": false,
	"createGDDBRepo": false,
	"getConfig": false,
	"createConfig": false,
	"updateConfig": false,
	"applyConfig": false,
	"resetConfig": false
};

var default_flags = config_flags;

function resetConfig() {
	console.log('Reset configurations');
	user = null;
	repos = null;
	status = null;
	gitddb = false;
	config_data = {};
	config_file_sha = '';
	config_flags = default_flags;
	applyConfig();
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 86400000));
	var expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookie(cname) {
	var name, value, flag = false;
	var ca = document.cookie.split(';');
	ca.forEach(p => {
		if (!flag) {
			var pa = p.split('=');
			if(pa.length==2){
				[name, value] = [pa[0].trim(), pa[1].trim()];
				if (name == cname) {
					flag = true;
					return value;
				}
			}
		}
	});
	return (flag) ? value : '';
}

function deleteCookie(cname) {
	setCookie(cname, '', -1);
}

function getUser() {
	console.log('Attempt: Get user info');
	if (!getCookie('access_token')) {
		console.log('Unauthorized');
		return;
	}
	fetch('https://api.github.com/user', {
		headers: {
			"Authorization": "token " + getCookie('access_token')
		}
	}).then(response => {
		return response.json();
	}).then(myJson => {
		// console.log(JSON.stringify(myJson));
		console.log('User info fetched');
		user = myJson;
		if(user['login']){
			if(config_flags['sign']=='in'){
				checkGDDBRepo();
			}
		}
	});
}

function getReposList() {
	if (!user) {
		console.log('Unauthorized');
		return;
	}
	fetch('https://api.github.com/user/repos' + '?type=private', {
		headers: {
			"Authorization": "token " + getCookie('access_token')
		}
	}).then(response => {
		return response.json();
	}).then(myJson => {
		repos = myJson;
	});
}

function checkGDDBRepo() {
	console.log('Attempt: Check GDDB repository existance');
	if (!user) {
		console.log('Unauthorized');
		return;
	}
	fetch('https://api.github.com/repos/' + user['login'] + '/git-ddb', {
		headers: {
			"Authorization": "token " + getCookie('access_token')
		}
	}).then(response => {
		return response.json();
	}).then(status => {
		if (status['message'] != 'Not Found') {
			console.log('git-ddb repository found');
			gitddb = true;
			if(config_flags['sign']=='in'){
				getConfig();
			}
		} else {
			console.log('Can\'t access git-ddb repository');
			if(config_flags['sign']=='in'){
				createGDDBRepo();
			}
		}
	});
}

function createGDDBRepo() {
	console.log('Attempt: Create GDDB repository');
	if (!user) {
		console.log('Unauthorized');
		return;
	}
	fetch('https://api.github.com/user/repos', {
		method: 'POST',
		headers: {
			"Authorization": "token " + getCookie('access_token')
		},
		body: JSON.stringify({
			"name": "git-ddb",
			"description": "Github Distrubuted Database Global Repository",
			"private": true,
			"has_issues": false,
			"has_projects": false,
			"has_wiki": false,
			"auto_init": true
		})
	}).then(response => {
		return response.json();
	}).then(status => {
		console.log('Creating git-ddb repository');
		if(status['errors']){
			if(status['errors'][0]['message']=='name already exists on this account'){
				gitddb = true;
				if(config_flags['sign']=='in'){
					createConfig();
				}
			}
		}
		else if(status['id']){
			// console.log(status);
			gitddb = true;
			if(config_flags['sign']=='in'){
				createConfig();
			}
		}
	});
}

function getConfig() {
	console.log('Attempt: Get config file');
	if (!user) {
		console.log('Unauthorized');
		return;
	}
	fetch('https://api.github.com/repos/' + user['login'] + '/git-ddb/contents' + config_file_path, {
		headers: {
			"Authorization": "token " + getCookie('access_token')
		}
	}).then(response => {
		return response.json();
	}).then(data => {
		if (data['message'] == 'Not Found') {
			console.log('Settings file not found');
			config_file_sha = '';
			if(config_flags['sign']=='in'){
				createConfig();
			}
		} else {
			console.log('Found setting file');
			config_data = JSON.parse(atob(data['content']));
			config_file_sha = data['sha'];
			if(config_flags['sign']=='in'){
				applyConfig();
			}
		}
	});
}

function createConfig() {
	console.log('Attempt: Create config file');
	if (!user) {
		console.log('Unauthorized');
		return;
	}
	fetch('https://api.github.com/repos/' + user['login'] + '/git-ddb/contents' + config_file_path, {
		method: 'PUT',
		headers: {
			"Authorization": "token " + getCookie('access_token')
		},
		body: JSON.stringify({
			"message": "set by @ankurparihar",
			"content": btoa(JSON.stringify(config_data))
		})
	}).then(response => {
		return response.json();
	}).then(status => {
		console.log(status);
		if (status['message']) {
			console.log('File creationg failed');			// critical error
		}
		else {
			config_file_sha = status['content']['sha'];
			applyConfig();
		}
	});
}

function updateConfig() {
	console.log('Attempt: Uploading config file');
	if (!user) {
		console.log('Unauthorized');
		return;
	}
	if (!config_file_sha) {
		console.log('Unknown config file');
		return;
	}
	fetch('https://api.github.com/repos/' + user['login'] + '/git-ddb/contents' + config_file_path, {
		method: 'PUT',
		headers: {
			"Authorization": "token " + getCookie('access_token')
		},
		body: JSON.stringify({
			"message": "set by @ankurparihar",
			"content": btoa(JSON.stringify(config_data)),
			"sha": config_file_sha
		})
	}).then(response => {
		return response.json();
	}).then(status => {
		console.log(status)
		if (status['message']) {
			console.log('Something went wrong updating settings');
		} else {
			console.log('Successfully updated settings');
		}
	});
}

function applyConfig() {
	console.log('Configuration applied');
	if(config_flags['sign']=='in'){
		config_flags['sign']=='';
	}
}

function signInfo() {
	console.log('Checking sign status');
	getUser();
	if (!user) {
		console.log('Signed out!');
		return 0;
	}
	return 1;
}

function signOut() {
	console.log('Signing Out');
	deleteCookie('access_token');
	resetConfig();
}

function signIn() {
	console.log('Signing In');
	config_flags = {
		"sign": "in",
		"getUser": true,
		"checkGDDBRepo": true,
		"createGDDBRepo": false,
		"getConfig": true,
		"createConfig": false,
		"updateConfig": false,
		"applyConfig": true,
		"resetConfig": false
	};
	getUser();
}

if(getCookie('access_token')){
	console.log('Access token found');
	signIn();
}else{
	console.log('No access token found');
}