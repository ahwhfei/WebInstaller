
# API definition

## Application API

---

> Application object definition

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

```text
Get {customer}/application/{applicationId}
```

2. Get applciaiton details according to application Name

```text
Get {customer}/applciaiton/{applciaitonName}
```

3. Get all applciaitons

```text
Get {customer}/applications
```

4. Add a new application

```text
POST {customer}/application
```

```json
Body Parameter
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
```

5. Update applicaiton details

```text
PUT {customer}/applicaiton/{applciationId}
```

```json
Body Parameter
{
    "Name": "Chocolately",
    "Version": "",
    "Message": "Installing Chocolately",
    "Script": "iex (new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1')",
    "QuitCode": 0,
    "Dependency": [{}]
}
```

6. DELETE a single applcation accroding applciationId

```text
DELETE {customer}/application/{applciationId}
```

---

## Application Installation List API

---

> Application List object definition

```json
{
    "Id": 1,
    "Name": "CWC Dev",
    "Description": "Nanjint team cwc dev",
    "Applications": [{}, {}],
    "CreateDate": "2017-01-16",
    "Customer": "root",
    "Script": "",
    "OS": [{}, {}],
    "Like": 0
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
POST {customer}/applcationList
```

```json
Body Parameter
{
    "Name": "CWC Dev",
    "Description": "Nanjint team cwc dev",
    "Applications": [{}, {}],
    "CreateDate": "2017-01-16",
    "Customer": "root",
    "Script": "",
    "OS": [{}, {}],
    "Like": 0
}
```

10. Modify a application

```text
PUT {customer}/applicationList/{ListID}
```

```json
Body Parameter
{
    "Name": "CWC Dev",
    "Description": "Nanjint team cwc dev",
    "Applications": [{}, {}],
    "CreateDate": "2017-01-16",
    "Customer": "root",
    "Script": "",
    "OS": [{}, {}],
    "Like": 0
}
```

11. Delete a list according ListID

```text
 DELETE {customer}/applicationList/{ListID}
```

---

> OS definition

```json
{
    "Name": "Windows 8 x64"
}
```
