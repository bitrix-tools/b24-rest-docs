# Кодирование данных

## Базовая информация

В зависимости от инструмента, который формирует и отправляет REST-запросы серверу, и передаваемых данных, может потребоваться провести кодирование параметров URL, иначе результат вызова метода будет непредсказуем.

Например, стоит задача создать в CRM лид с названием "John&Martin" через входящий вебхук. Полный URL запроса в соответствии с документацией метода `crm.lead.add` выглядит так:

```curl
https://b24-abcdef.bitrix24.ru/rest/1/xxxxxxx/crm.lead.add?fields[TITLE]=John&Martin
```

После выполнения запроса любым желаемым образом (в браузере, в командной строке cURL'ом, скриптом) можно обнаружить, что у созданного лида название не соответствует запросу - там осталось только "John". Это произошло из-за того, что в названии лида присутствует символ `&`, у которого есть специальное значение в URL: он применяется для разделения параметров запроса.

Поэтому у запроса образовалось два параметра - `fields[TITLE]` со значением `John` и новый параметр `Martin` с пустым значением.

Чтобы Битрикс24 (да и любой веб-сервер в мире) понял, что амперсанд это не спецсимвол, а часть значения, он должен быть преобразован в последовательность `%26`. Правильный URL для поставленной задачи будет выглядеть следующим образом:

```curl
https://b24-abcdef.bitrix24.ru/rest/1/xxxxxxx/crm.lead.add?fields[TITLE]=John%26Martin
```

Такое преобразование называется URL-кодированием. Символов, которые могут присутствовать в значении параметра, но имеют особую роль в URL и "ломают" запрос, немало: `&`, `?`, `%`, `[` и пр. Чтобы запрос формировался правильно, все значения параметров должны url-кодироваться. В каждом языке программирования существует функция для такого преобразования:

* Javascript - `encodeURIComponent`;
* PHP - `urlencode`;
* Python - `urllib.quote_plus`;
* другой язык - поискать "мой_язык url кодирование" или "мой_язык url encode".

Если запрос формируется вручную без использования языка программирования, следует воспользоваться любым сервисом, найденным по запросу "url кодирование онлайн".

{% note tip %}

Проверить правильность формирования запроса можно с помощью сервисов тестирования запросов - например, [https://webhook.site](https://webhook.site). Он позволяет просматривать каждый отправленный запрос, его заголовки и передаваемые параметры в удобном интерфейсе. Такие сервисы не проверяют корректность параметров применительно к определённому методу REST API, но позволяют выявить более общие проблемы, как обозначенная выше.

{% endnote %}

## Двойное url-кодирование

При использовании метода `batch` в параметре `cmd` передаётся массив запросов в виде "метод?параметр1=значение&параметр2=7", то есть практически так же, как бы выглядели эти запросы [по отдельности](./general-principles.html), только без первой части адреса. 

Но поскольку такой url становится значением параметра запроса, он тоже должен быть url-кодирован. То есть сначала, как обычно, необходимо url-закодировать значения параметров запроса, а затем и каждый запрос, потому что они теперь являются значениями параметра `cmd` запроса `batch`.

Если бы потребовалось создать лид из примера выше в рамках пакетного выполнения запросов, URL выглядел бы следующим образом:

```curl
https://b24-abcdef.bitrix24.ru/rest/1/xxxxxxx/batch?cmd[0]=crm.lead.add%3Ffields%5BTITLE%5D%3DJohn%2526Martin
```

## Кодирование сложных структур

{% note info %}

Вообще говоря, чтобы избежать такого рода сложностей, мы настоятельно рекомендуем использовать готовые SDK для работы с REST API. Такие билиотеки автоматически кодируют данные, обрабатывают ошибки, упрощают работу с API и позволяют сосредоточиться на бизнес-логике приложения.

Битрикс24 предлагает разработчикам несколько SDK для работы с REST API на разных языках программирования:

* [B24PhpSdk](../../sdk/b24phpsdk/index.md) и [CRest PHP SDK](../../sdk/crest-php-sdk/index.md) для PHP;
* [B24JsSDK](../../sdk/b24jssdk/index.md) для JavaScript;

{% endnote %}

При обращении к API часто требуется передать вложенную структуру данных - объект большой вложенности, массив в объекте, массив объектов. Самый простой способ это сделать - выполнить POST-запрос с передачей данных в виде JSON:

{% list tabs %}

- cURL

  ```bash
  curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
          "fields": {
              "TITLE": "My company",
              "PHONE": [
                  {
                      "VALUE": "112233",
                      "VALUE_TYPE": "WORK"
                  },
                  {
                      "VALUE": "555888112",
                      "VALUE_TYPE": "OTHER"
                  }
              ]
          }
      }' \ 
  https://***/rest/***/crm.lead.add
  ```

- PHP

  ```php
  $data = [
      "fields" => [
          "TITLE" => "My company",
          "PHONE" => [
              [
                  "VALUE" => "112233",
                  "VALUE_TYPE" => "WORK"
              ],
              [
                  "VALUE" => "555888112",
                  "VALUE_TYPE" => "OTHER"
              ]
          ]
      ]
  ];
  
  $ch = curl_init();
  curl_setopt($ch, CURLOPT_USERAGENT, 'php script');
  curl_setopt($ch, CURLOPT_HEADER, false);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_TIMEOUT, 5);
  curl_setopt($ch, CURLOPT_URL, 'https://***/rest/***/crm.lead.add');
  curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
  $raw = curl_exec($ch);
  curl_close($ch);
  ```

- Javascript

  ```javascript
  data = {
      fields: {
          TITLE: 'My company',
          PHONE: [
              {
                  VALUE: '112233',
                  VALUE_TYPE: 'WORK'
              },
              {
                  VALUE: '555888112',
                  VALUE_TYPE: 'OTHER'
              }
          ]
      }
  };
  
  fetch('https://***/rest/***/crm.lead.add', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  });
  
  ```

- Python

  ```python
  import requests
  
  data = {
      'fields': {
          'TITLE': 'My company',
          'PHONE': [
                {
                      'VALUE': '112233',
                      'VALUE_TYPE': 'WORK'
                },
                {
                      'VALUE': '555888112',
                      'VALUE_TYPE': 'OTHER'
                }
          ]
      }
  }
  
  r = requests.post('https://***/rest/***/crm.lead.add', json=data)
  
  ```

{% endlist %}

Если возможность отправить JSON отсутствует, данные могут быть отправлены GET- или POST-запросом. GET-запрос из примера выше будет выглядеть следующим образом:

```curl
https://***/rest/***/crm.lead.add.json?fields[TITLE]=My%20company&fields[PHONE][0][VALUE]=112233&fields[PHONE][0][VALUE_TYPE]=WORK&fields[PHONE][1][VALUE]=555888112&fields[PHONE][1][VALUE_TYPE]=OTHER
```

В PHP получить подобную строку из массива можно с помощью функции `http_build_query`, в JS - сторонними решениями (например, библиотека [qs](https://www.npmjs.com/package/qs)).

При отправке POST-запроса необходимо указывать `Content-Type` отправляемых данных - `application/x-www-form-urlencoded` или `multipart/form-data; boundary=SomeBoundary` и соответствующим образом кодировать данные. Примеры тела запроса:

{% list tabs %}

- application/x-www-form-urlencoded

  ```curl
  fields[TITLE]=My%20company&fields[PHONE][0][VALUE]=112233&fields[PHONE][0][VALUE_TYPE]=WORK&fields[PHONE][1][VALUE]=555888112&fields[PHONE][1][VALUE_TYPE]=OTHER
  ```

- multipart/form-data

  ```curl
  --SomeBoundary
  Content-Disposition: form-data; name="fields[TITLE]"
  
  My company
  --SomeBoundary
  Content-Disposition: form-data; name="fields[PHONE][0][VALUE]"
  
  112233
  --SomeBoundary
  Content-Disposition: form-data; name="fields[PHONE][0][VALUE_TYPE]"
  
  WORK
  --SomeBoundary
  Content-Disposition: form-data; name="fields[PHONE][1][VALUE]"
  
  555888112
  --SomeBoundary
  Content-Disposition: form-data; name="fields[PHONE][1][VALUE_TYPE]"
  
  OTHER
  --SomeBoundary
  ```

{% endlist %}

## Порядок следования параметров

Некоторые методы требуют строгого соблюдения порядка следования параметров в запросе (например, [task.commentitem.add](../tasks/comment-item/task-comment-item-add.html), [task.checklistitem.complete](../tasks/checklist-item/task-checklist-item-complete.html)).

Это означает, что данные параметры недопустимо передавать как именованные (в PHP - как ассоциативный массив, в JS - как объект), иначе результат выполнения будет непредсказуем и может завершиться ошибкой. Они должны быть представлены в виде индексного (упорядоченного) массива (отчёт с 0).

Пример **неправильного** добавления комментария к задачи:

{% list tabs %}

- cURL

  ```bash
  curl 'https://***/rest/***/task.commentitem.add?TASKID=123&FIELDS[POST_MESSAGE]=test'
  ```

- PHP 

  ```php
  CRest::call(
      'task.commentitem.add',
      [
          'TASKID' => 123,
          'FIELDS' => ['POST_MESSAGE' => 'text']
      ]
  );
  ```

- JS
  
  ```javascript
  BX24.callMethod(
      'task.commentitem.add',
      {
          TASKID: 123,
          FIELDS: { 'POST_MESSAGE': 'text' }
      }
  );
  ```

{% endlist %}

Пример **правильного** добавления комментария к задачи:

{% list tabs %}

- cURL

  ```bash
  curl 'https://***/rest/***/task.commentitem.add?0=123&1[POST_MESSAGE]=test'
  ```

- PHP
  
  ```php
  CRest::call(
      'task.commentitem.add',
      [
          123,
          ['POST_MESSAGE' => 'text']
      ]
  );
  ```

- JS

  ```javascript
  BX24.callMethod(
      'task.commentitem.add',
      [
          123,
          { 'POST_MESSAGE': 'text' }
      ]
  );
  ```

{% endlist %}
