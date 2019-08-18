const { dialog } = require('electron').remote;
const compress_images = require('compress-images');
var inputFolderPath = '';
var outputFolderPath = '';

const inputFolderButton = document.querySelector('#input-folder');
inputFolderButton.addEventListener('click', selectInputFolder)

const outputFolderButton = document.querySelector('#output-folder');
outputFolderButton.addEventListener('click', selectOutputFolder);

const compressButton = document.querySelector('#compress');
compressButton.addEventListener('click', function () {
    console.log('compressButtonClicked');
    compressImages(inputFolderPath, outputFolderPath);
});

function selectInputFolder() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, function (folder) {
        inputFolderPath = folder.toString();
        const folderType = 'Pasta Origem: ';
        const folderId = 'input';
        createFoldersPathText(inputFolderPath, folderType, folderId);
    });
}

function selectOutputFolder() {
    dialog.showOpenDialog({
        properties: ['openDirectory']
    }, function (folder) {
        outputFolderPath = folder.toString();
        const folderType = 'Pasta Destino: ';
        const folderId = 'output';
        createFoldersPathText(outputFolderPath, folderType, folderId);
    });
}

function createFoldersPathText(folderPathText, folderType, folderId) {
    if (folderPathText) {
        const folderText = document.querySelector("#" + folderId);
        folderText.textContent = folderType + folderPathText;
    } else {
        console.log('folderPathText is Null');
    }
}

function compressImages(inputFolderPath, outputFolderPath) {
    if (inputFolderPath && outputFolderPath) {

        const formattedInputFolderPath = inputFolderPath + "/*.{jpg,JPG,jpeg,JPEG,gif,png,svg}";
        const formattedOutputFolderPath = outputFolderPath + "/";

        compress_images(formattedInputFolderPath, formattedOutputFolderPath, { compress_force: false, statistic: true, autoupdate: true }, false,
            { jpg: { engine: 'mozjpeg', command: ['-quality', '60'] } },
            { png: { engine: 'pngquant', command: ['--quality=20-50'] } },
            { svg: { engine: 'svgo', command: '--multipass' } },
            { gif: { engine: 'gifsicle', command: ['--colors', '64', '--use-col=web'] } }, function (error, completed, statistic) {
                // if (error) {
                //     showMessageDialogBox('Ocorreu um erro!', error.message.toString());
                // }

                // if (completed) {
                //     showMessageDialogBox('Sucesso!', `Suas imagens foram comprimidas com
                //     sucesso!`);
                // }
               console.log(error);
               console.log(completed);
               console.log(statistic);

            });
    } else {
        showMessageDialogBox("Ops!", "Primeiro escolha as pastas de origem e saida!");
        console.log('Primeiro escolha as pastas de origem e saida!');
    }
}

function showMessageDialogBox(title, message) {
    const options = {
        title: title,
        message: message,
        buttons: ['Ok'],
    };
    dialog.showMessageBox(null, options, function (response, checkBoxResponse) {
        console.log(response);
    });
}