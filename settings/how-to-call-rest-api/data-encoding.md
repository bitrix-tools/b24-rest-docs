# Кодирование данных

При отправке REST-запросов специальные символы в параметрах могут нарушить структуру URL. Это приведет к ошибкам или неверным данным.

Например, нужно создать лид с названием `John&Martin` через входящий вебхук. Согласно документации метода [crm.lead.add](../../api-reference/crm/leads/crm-lead-add.md), URL запроса должен выглядеть так:

```curl
https://b24-abcdef.bitrix24.ru/rest/1/xxxxxxx/crm.lead.add?fields[TITLE]=John&Martin
```

После выполнения запроса можно обнаружить, что в названии лида осталось только `John`. Это произошло из-за того, что символ `&` разделяет параметры запроса. Если он встречается внутри значения, сервер воспримет его как начало нового параметра, а не как часть данных.

Поэтому у запроса образовалось два параметра:

- `fields[TITLE]` со значением `John`
- новый параметр `Martin` без значения

Для корректной работы метода нужно заменить специальный символ на кодированный аналог. Для `&` это `%26`. Такое преобразование называется URL-кодированием.

Правильный URL для поставленной задачи:

```curl
https://b24-abcdef.bitrix24.ru/rest/1/xxxxxxx/crm.lead.add?fields[TITLE]=John%26Martin
```
## Какие символы нужно кодировать

В URL особую роль играют: `&`, `?`, `%`, `[`, `]`, `#` и другие. Если они встречаются в значении параметра, их обязательно кодируют. Иначе сервер интерпретирует их как служебные, и результат запроса станет непредсказуемым.

## Как кодировать в разных языках

Каждый язык программирования предоставляет встроенную функцию:

-  JavaScript — `encodeURIComponent`
-  PHP — `urlencode`
-  Python — `urllib.parse.quote_plus`
-  Java — `URLEncoder.encode`

Если вы формируете запрос вручную, используйте любой онлайн-сервис по запросу «url кодирование онлайн».

{% note tip "" %}

Проверить корректность запроса можно с помощью сервиса [https://webhook.site](https://webhook.site). Он показывает полный запрос, включая заголовки и параметры.

{% endnote %}

## Двойное кодирование для batch-запросов

Метод `batch` позволяет выполнить несколько запросов за один вызов. Запросы передаются в параметре `cmd` в виде строк: `метод?параметр1=значение&параметр2=7`. Но теперь каждая такая строка сама становится значением параметра. Поэтому ее тоже нужно кодировать.

1. Сначала закодируйте значения внутри вложенного запроса.
2. Затем закодируйте всю строку вложенного запроса целиком.

Если бы требовалось создать лид из примера выше в рамках пакетного выполнения запросов, URL выглядел бы так:

```curl
https://b24-abcdef.bitrix24.ru/rest/1/xxxxxxx/batch?cmd[0]=crm.lead.add%3Ffields%5BTITLE%5D%3DJohn%2526Martin
```
Обратите внимание: `%26` превратилось в `%2526`, потому что символ `%` сам был закодирован как `%25`.

{% note info "" %}

Чтобы избежать ручного кодирования и других сложностей, используйте готовые SDK. Они берут на себя всю работу с URL, кодированием и обработкой ошибок.

Официальные SDK Битрикс24:

-  [B24PhpSdk](../../sdk/b24phpsdk/index.md) и [CRest PHP SDK](../../sdk/crest-php-sdk/index.md) для PHP
-  [B24JsSDK](../../sdk/b24jssdk/index.md) для JavaScript

{% endnote %}

## Как передавать сложные структуры

Многие методы REST API принимают вложенные данные, например, список телефонов контакта или массив полей. В таких случаях рекомендуется отправлять POST-запросы с телом в формате JSON. Тогда структура сохраняется, и не нужно думать о кодировании отдельных параметров.

Пример лида с несколькими телефонами:

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

- JS

  ```js
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

Если нет возможности отправить JSON, используйте GET-запрос или обычный POST-запрос. Данные нужно передавать в параметрах запроса, соблюдая правила кодирования.

### GET-запрос

GET-запрос для примера выше:

```curl
https://***/rest/***/crm.lead.add.json?fields[TITLE]=My%20company&fields[PHONE][0][VALUE]=112233&fields[PHONE][0][VALUE_TYPE]=WORK&fields[PHONE][1][VALUE]=555888112&fields[PHONE][1][VALUE_TYPE]=OTHER
```

Как собрать такую строку программно:

-  PHP — функция `http_build_query` превращает массив в правильно закодированную строку.
-  JavaScript — можно использовать библиотеку `qs` или написать свою функцию.

### POST-запрос

При POST-запросе нужно указать правильный заголовок `Content-Type` и отформатировать тело запроса.

-  `application/x-www-form-urlencoded` — данные преобразуются в одну строку
-  `multipart/form-data` — данные разбиваются на части, каждая имеет свои заголовки и отделена строкой-разделителем `boundary=SomeBoundary`

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

## Порядок параметров

Некоторые методы, например, [task.commentitem.add](../../api-reference/tasks/comment-item/task-comment-item-add.md) и [task.checklistitem.complete](../../api-reference/tasks/checklist-item/task-checklist-item-complete.md), требуют строгого соблюдения порядка передачи параметров. В таких случаях параметры нельзя передавать по имени — как объект в JavaScript или ассоциативный массив в PHP. Иначе результат выполнения будет непредсказуем или метод вернет ошибку.

Для передачи таких параметров используйте массив с числовыми индексами. Индексы должны начинаться с 0.

Пример неправильного добавления комментария к задаче:

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

Пример правильного добавления комментария к задаче:

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
