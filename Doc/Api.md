
Application definition
```json
{
    "Id": 1,
    "Name": "Chocolately",
    "Description": "",
    "Version": "",
    "Message": "Installing Chocolately",
    "Script": "iex (new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1')",
    "QuitCode": 0,
    "Dependency": [{}],
    "CreateDate": "",
    "SourceURL": "",
    "Publisher": "",
    "DownloadSize": "100 MB",
    "Icon": "",
    "Like": 0,
    "Restart": True|False,
    "Passive": True|False,
    "Quiet": True|Fasle,
    "OS": [{}, {}]
}
```

1. Get application detail according to application ID
Get {customer}/application/{applicationId}

2. Get applciaiton details according to application Name
Get {customer}/applciaiton/{applciaitonName}

3. Get all applciaitons
Get {customer}/applications

4. Add a new application
POST {customer}/application
{
    "Name": "Chocolately",
    "Description": "",
    "Version": "",
    "Message": "Installing Chocolately",
    "Script": "iex (new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1')",
    "QuitCode": 0,
    "Dependency": [{}],
    "SourceURL": "",
    "Publisher": "",
    "DownloadSize": "100 MB",
    "Icon": "",
    "Like": 0(Default),
    "Restart": False(Default),
    "Passive": False(Default),
    "Quiet": True(Default),
    "OS": [{}, {}]
}

5. Update applicaiton details
PUT {customer}/applicaiton/{applciationId}
{
    "Name": "Chocolately",
    "Version": "",
    "Message": "Installing Chocolately",
    "Script": "iex (new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1')",
    "QuitCode": 0,
    "Dependency": [{}]
}

6. DELETE a single applcation accroding applciationId
DELETE {customer}/application/{applciationId}

Application Installation List
```json
{
    "Id": 1,
    "Name": "CWC Dev",
    "Description": "Nanjint team cwc dev",
    "Applications": [{}, {}],
    "CreateDate": "2017-01-16",
    "Customer": "root",
    "Script": ""
    "OS": [{}, {}],
    "Like": 0
}
```

7. GET {customer}/applicationList/{ListID}

8. GET {customer}/applicationLists

9. POST {customer}/applcationList
{
    "Name": "CWC Dev",
    "Description": "Nanjint team cwc dev",
    "Applications": [{}, {}],
    "CreateDate": "2017-01-16",
    "Customer": "root",
    "Script": ""
    "OS": [{}, {}],
    "Like": 0
}

10. PUT {customer}/applicationList/{ListID}
{
    "Name": "CWC Dev",
    "Description": "Nanjint team cwc dev",
    "Applications": [{}, {}],
    "CreateDate": "2017-01-16",
    "Customer": "root",
    "Script": ""
    "OS": [{}, {}],
    "Like": 0
}

11. DELETE {customer}/applicationList/{ListID}

OS definition
```json
{
    Name: ""
}
```
