### THE FOLLOWING INSTRUCTIONS ARE FOR DEPLOYING ON UBUNTU 14.04


1. PREREQUISITES
	a. create a new user account
		useradd <name of user here>
	b. add user to sudoers
		usermod -aG sudo <name of user here>
	c. setup private key for user
		if you don't know how to do this, ask for help before you fuck it up.
	d. disable password auth in ssh
		same as above
	e. restart ssh
		service ssh restart


	
2. INSTALLING THE SITE

	a. INSTALL NGINX
		sudo apt-get install python-software-properties && sudo add-apt-repository ppa:nginx/stable && sudo apt-get update && sudo apt-get upgrade && sudo apt-get install nginx -y

	b. INSTALL REDIS
		sudo add-apt-repository ppa:chris-lea/redis-server && sudo apt-get update && sudo apt-get upgrade && sudo apt-get install redis-server -y

	c. INSTALL MONGODB
		sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
		echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
		sudo apt-get update
		sudo apt-get install -y mongodb-org

	d. INSTALL NODEJS
		curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
		sudo apt-get install -y nodejs
		
	e. INSTALL npm and nodemon globally while logged in as root
		npm install -g npm
		npm install -g nodemon
		
	f. install git, create install directory, change owner of that directory to the user you created earlier, change to the install directory, clone repo into that directory
		sudo apt-get install git
		mkdir /path/to/where/you/want/to/install
		chown <name of user here>:<name of user here> /path/towhere/you/want/to/install
		cd /path/where/you/want/to/install
		git clone https://<your user name here>@bitbucket.org/6bitconsulting/jeda.git

	g. INSTALL NPM
		sudo npm install -g npm

	h. INSTALL DEPENDENCIES
		npm install
		
	i. INSTALL NGINX CONFIG
		sudo cp nginx.conf /etc/nginx/nginx.conf

	j. RESTART NGINX
		sudo service nginx restart
		
	k. Reinstall unicode (in your install directory)
		cd node_modules/slug
		npm install unicode
	
	l. Rebuild node-sass
		npm rebuild node-sass

	m. RUN PROGRAM
		./run.sh

		