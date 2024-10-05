const ejs = require('ejs');
const fs = require('fs');
const chokidar = require('chokidar');
const path = require('path');
const { argv } = require('process');

// Diretório de entrada (arquivos .ejs) e saída (.html)
const layoutFileEjs = path.join(__dirname, 'layout.ejs');
const inputDir = path.join(__dirname, 'views');
const outputDir = path.join(__dirname, '../public');

// Função que compila o .ejs para .html
function compileEJS(filePath, view) {
  const fileName = path.basename(view, '.ejs');
  const outputFilePath = path.join(outputDir, `${fileName}.html`);

  // Ler o arquivo .ejs
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) throw err;

    // Compilar o .ejs para HTML
    const html = ejs.render(data, {view});

    // Escrever o arquivo .html no diretório de saída
    fs.writeFile(outputFilePath, html, (err) => {
      if (err) throw err;
      console.log(`Arquivo gerado: ${outputFilePath}`);
    });
  });
}

// Processa todos os arquivos .ejs no diretório de entrada
function buildAllEJS() {
  fs.readdir(inputDir, (err, files) => {
    if (err) throw err;

    // Criar o diretório de saída, se não existir
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Compilar todos os arquivos .ejs
    files.forEach(file => {
      if (path.extname(file) === '.ejs') {
        compileEJS(layoutFileEjs, path.join(__dirname, 'views', file));
      }
    });
  });
}

// Executar o build
buildAllEJS();

if(argv[2] === 'watch') {
  console.log('Observando alterações nos arquivos .ejs');
  const objectsPath = [
    path.join(__dirname, 'views'),
    __dirname
  ];
  
  const watcher = chokidar.watch(objectsPath, {
    ignored: /(^|[\/\\])\../, // ignora arquivos ocultos
    persistent: true
  });

  watcher.on('change', filePath => {
    const fileRelativePath = path.relative(path.join(__dirname, '../'), filePath);
    console.log(`\r\x1b[35m=>\x1b[m O arquivo ${fileRelativePath} foi alterado`);
    buildAllEJS();
  });
}