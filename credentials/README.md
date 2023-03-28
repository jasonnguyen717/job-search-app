# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP **3.16.56.42**
2. SSH username **ubuntu**
3. SSH password or key. **attached in t4key.cer file**
    <br> If a ssh key is used please upload the key to the credentials folder.
4. Database URL or IP and port used. **172.31.22.91:3306**
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
5. Database username **team** 
6. Database password **jellybeans**
7. Database name (basically the name that contains all your tables) **648db**
8. Instructions on how to use the above information.
    1. to log into server, run
       `ssh -i t4key.cer ubuntu@3.16.56.42`
    2. to log into database via MySQL Workbench, make a Standard TCP/IP over SSH connection with the following info:
    - Connection Name: `teams_db`
    - SSH Hostname: `3.16.56.42`
    - SSH username: `ubuntu`
    - SSH Key File: `t4key.cer`
    - MySQL Hostname: `127.0.0.1`
    - MySQL Server Port: `3306`
    - Username: `team`
    - Password: `jellybeans`

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.
