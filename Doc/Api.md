# Restful API definition

# Application

* Application object definition

```json
{
    "createDate": "",
    "dependency": [{}],
    "description": "",
    "downloadSize": "100 MB",
    "icon": "",
    "id": 1,
    "like": 0,
    "message": "Installing Chocolately",
    "name": "Chocolately",
    "passive": True|False,
    "publisher": "",
    "quiet": True|Fasle,
    "quitCode": 0,
    "restart": True|False,
    "script": "iex (new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1')",
    "sourceURL": "",
    "supportedOS": [{"Name": "Windows 8 x64"}, {"Name": "Windows 10 x64"}],
    "version": ""
}
```

1. Get application detail according to application ID

```text
Get {customer}/application/{applicationId}
```
2. Get applicaiton details according to application Name

```text
GET {customer}/applicaiton/{applciaitonName}
```

3. Get all applicaitons

```text
GET {customer}/applications
```

4. Add a new application

```text
POST {customer}/application
```

Body Parameter

```json
{
    "dependency": [{}],
    "description": "",
    "downloadSize": "100 MB",
    "icon": "",
    "like": 0(Default),
    "message": "Installing Chocolately",
    "name": "Chocolately",
    "passive": False(Default),
    "publisher": "",
    "quiet": True(Default),
    "quitCode": 0,
    "restart": False(Default),
    "script": "iex (new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1')",
    "sourceURL": "",
    "supportedOS": [{}, {}],
    "version": ""
}
```

5. Update applicaiton details

```text
PUT {customer}/applicaiton/{applciationId}
```

Body Parameter

```json
{
    "dependency": [{}],
    "message": "Installing Chocolately",
    "name": "Chocolately",
    "quitCode": 0,
    "script": "iex (new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1')",
    "version": ""
}
```

6. DELETE a single applcation accroding applciationId

```text
DELETE {customer}/application/{applciationId}
```

# Application Installation List

* Application List object definition

```json
{
    "applications": [{}, {}],
    "createDate": "2017-01-16",
    "customer": "root",
    "description": "Nanjint team cwc dev",
    "id": 1,
    "like": 0,
    "name": "CWC Dev",
    "script": "",
    "supportedOS": [{}, {}]
}
```

7. Get a single list according to ListID

```text 
GET {customer}/applicationList/{ListID}
```

8. Get all list  

```text
GET {customer}/applicationLists
```

9. Create a new list 

```text
POST {customer}/applicationList
```

Body Parameter

```json
{
    "applications": [{}, {}],
    "createDate": "2017-01-16",
    "customer": "root",
    "description": "Nanjint team cwc dev",
    "like": 0,
    "name": "CWC Dev",
    "script": "",
    "supportedOS": [{"Name": "Windows 8 x64"}, {"Name": "Windows 10 x64"}]
}
```

10. Modify a application 

```text
PUT {customer}/applicationList/{ListID}
```

Body Parameter

```json
{
    "applications": [{}, {}],
    "createDate": "2017-01-16",
    "customer": "root",
    "description": "Nanjing CWC Dev Team",
    "like": 0,
    "name": "CWC Dev",
    "script": "",
    "supportedOS": [{"Name": "Windows 8 x64"}, {"Name": "Windows 10 x64"}]
}
```

11. Delete a list according ListID
```text
 DELETE {customer}/applicationList/{ListID}
```
# OS definition

```json
{
    "Name": "Windows 8 x64"
}
```
