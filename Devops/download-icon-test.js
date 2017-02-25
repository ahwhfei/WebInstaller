const download = require('./download-icon');

download.downloadIcon2('http://go.microsoft.com/fwlink/?LinkId=259577', 't.jpg');
download.downloadIcon2('http://www.ruby-lang.org/images/logo.gif', 'tt.jpg')
    .then(image => console.log(image));
download.downloadIcon2('http://www.microsoft.com/web/media/gallery/apps-screenshots/net-option-a.png', 'ttt.jpg');
