# Restful API definition

# Application object definition

```json
{
    "id": 1,
    "name": "Chocolately",
    "description": "",
    "version": "",
    "message": "Installing Chocolately",
    "script": "iex (new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1')",
    "quitCode": 0,
    "dependency": [{}],
    "createDate": "",
    "sourceURL": "",
    "publisher": "",
    "downloadSize": "100 MB",
    "icon": "",
    "like": 0,
    "restart": True|False,
    "passive": True|False,
    "quiet": True|Fasle,
    "supportedOS": [{"Name": "Windows 8 x64"}, {"Name": "Windows 10 x64"}]
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
    "name": "Chocolately",
    "description": "",
    "version": "",
    "message": "Installing Chocolately",
    "script": "iex (new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1')",
    "quitCode": 0,
    "dependency": [{}],
    "sourceURL": "",
    "publisher": "",
    "downloadSize": "100 MB",
    "icon": "",
    "like": 0(Default),
    "restart": False(Default),
    "passive": False(Default),
    "quiet": True(Default),
    "supportedOS": [{}, {}]
}
```

5. Update applicaiton details

```text
PUT {customer}/applicaiton/{applciationId}
```

Body Parameter

```json
{
    "name": "Chocolately",
    "version": "",
    "message": "Installing Chocolately",
    "script": "iex (new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1')",
    "quitCode": 0,
    "dependency": [{}]
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
    "id": 1,
    "name": "CWC Dev",
    "description": "Nanjint team cwc dev",
    "applications": [{}, {}],
    "createDate": "2017-01-16",
    "customer": "root",
    "script": "",
    "supportedOS": [{}, {}],
    "like": 0
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
    "name": "CWC Dev",
    "description": "Nanjint team cwc dev",
    "applications": [{}, {}],
    "createDate": "2017-01-16",
    "customer": "root",
    "script": "",
    "supportedOS": [{"Name": "Windows 8 x64"}, {"Name": "Windows 10 x64"}],
    "like": 0
}
```

10. Modify a application 

```text
PUT {customer}/applicationList/{ListID}
```

Body Parameter

```json
{
    "name": "CWC Dev",
    "description": "Nanjing CWC Dev Team",
    "applications": [{}, {}],
    "createDate": "2017-01-16",
    "customer": "root",
    "script": "",
    "supportedOS": [{"Name": "Windows 8 x64"}, {"Name": "Windows 10 x64"}],
    "like": 0
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
