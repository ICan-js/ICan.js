# ICan.js :tophat:

[![pipeline status](https://gitlab.com/ican.js/ican.js/badges/master/pipeline.svg)](https://gitlab.com/ican.js/ican.js/commits/master)
[![docs status](https://icanjs.netlify.com/docs/badge.svg)](https://icanjs.netlify.com/docs/source.html)

![logo_icanjs](https://icanjs.netlify.com/static/img/pagina_gitlab.png)


ICan.js é uma biblioteca criada para disponibilizar recursos assistivos em páginas da web através da aplicação de técnicas de Aprendizado Profundo. Atualmente o ICan.js disponibiliza funcionalidades para o controle de páginas web através de gestos com a cabeça e escrita de textos com gestos de Libras.

## Arquitetura do projeto :construction_worker:

A biblioteca é dividida em duas camadas de funcionalidades, estas criadas sob as funcionalidades do Tensorflow.js. A Figura abaixo apresenta as camadas da biblioteca.

![arquitetura_icanjs](https://icanjs.netlify.com/static/img/arquitetura_icanjs2.jpeg)

Veja que, a camada **Core** possui as funcionalidades principais da biblioteca, os modelos de rede neural e de regressão, e a camada **Common** consome as funcionalidades da camada **Core** e cria os recurso assistivos.

## Utilização :space_invader:

A ideia da biblioteca foi criar uma forma simples de aplicar técnicas de Deep Learning no desenvolvimento de recursos assistivos. Então para utilizar as funcionalidades desenvolvidas na biblioteca basta importar o arquivo compilado ([icjs.js](https://icanjs.netlify.com/res/icjs.js)) em suas páginas html.

```html
<html>
  <head>
    <!-- Carrega o ICan.js -->
    <script src="icjs.js"> </script>
    <script>
        // Insira seus códigos de utilização da biblioteca aqui
    </script>
  </head>
  <body>
  </body>
</html>
```

Para demonstrar o uso da biblioteca foram criados alguns exemplos de utilização, consulte o [repositório](https://gitlab.com/ican.js/examples) de exemplos, ou acesse diretamente os exemplos que estão online, estes listados abaixo.

* [Controle de mouse com a cabeça](https://icanjs-examples.netlify.com/controle-de-mouse/);
* [Escrita de texto utilizando gestos de Libras](https://icanjs-examples.netlify.com/escrita-de-texto/).

## Documentação :notebook_with_decorative_cover:

A documentação do projeto está disponível [aqui](https://icanjs.netlify.com/docs/)

## Colaborando :balloon:

O ICan.js ainda está em desenvolvimento, então, caso você queira ajudar, abra issues das melhorias que você acha importante, que podemos ir conversando e programando novas funcionalidades.
