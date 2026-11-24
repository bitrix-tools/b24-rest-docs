# Как найти CRM-объект, созданный из диалога открытой линии

> Scope: [`imopenlines`](../../api-reference/scopes/permissions.md), [`crm`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнить сценарий: пользователь приложения, который участвует в чате открытой линии или может подключаться к диалогам этой линии и имеет право на чтение нужных элементов CRM
> - [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md) — любой пользователь, вызов только с авторизацией приложения
> - [imopenlines.dialog.get](../../api-reference/imopenlines/openlines/sessions/imopenlines-dialog-get.md) — участник чата открытой линии или пользователь, который может подключаться к диалогам этой линии
> - [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) — пользователь с правом на чтение элементов CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Коннектор открытой линии передает в Битрикс24 сообщения клиента из внешнего канала: мессенджера, чата на сайте или сервиса поддержки. Если CRM-трекер создает по обращению лид или сделку с контактом либо находит существующий контакт или компанию, интеграции часто нужно получить идентификатор связанного CRM-объекта.

Не передавайте технические идентификаторы в поле `email` метода [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md). CRM-трекер сохраняет корректный по формату адрес в карточку клиента и ищет по нему существующие контакты и компании. Маркер в формате адреса попадет в карточку, а по совпадающему маркеру обращения разных клиентов могут привязаться к одному контакту.

## Как получить идентификатор связанного CRM-объекта

Чтобы найти лид, контакт или компанию, которые CRM-трекер связал с диалогом открытой линии, последовательно выполним методы:

1. [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md) — отправим сообщение клиента в открытую линию и получим идентификатор чата

2. [imopenlines.dialog.get](../../api-reference/imopenlines/openlines/sessions/imopenlines-dialog-get.md) — получим данные диалога и код пользователя открытой линии

3. [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) — найдем лид, контакт или компанию по точному значению поля мессенджера

## Что понадобится

- Приложение с правами `imopenlines` и `crm`. Метод `imconnector.send.messages` работает только в контексте приложения, входящий вебхук для него не подходит
- Открытая линия с включенной работой с CRM: в ее настройках задано, какой объект CRM создавать по обращению
- Коннектор, зарегистрированный и подключенный к открытой линии. Как это сделать, описано в туториале [{#T}](./example-connector.md)
- Код коннектора из параметра `ID` метода [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md). В примерах используется `myconnector`
- Идентификатор открытой линии. В примерах используется `107`
- Внешний идентификатор чата или канала. В примерах используется `channel-123`
- Внешний идентификатор клиента. В примерах используется `ext-user-42`

JS-примеры выполняйте на странице приложения, где подключена библиотека `BX24`. PHP-примеры выполняйте на сервере приложения с настроенной библиотекой [CRest](../../sdk/crest-php-sdk/index.md). Замените идентификаторы коннектора, линии, клиента, чата и сообщения, телефон, текст сообщения и адрес чата из примеров на данные своей интеграции. Пример шага 1 отправляет настоящее сообщение в открытую линию, поэтому проверяйте сценарий на тестовом канале.

## 1\. Отправим сообщение клиента

Передадим сообщение в открытую линию методом [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md). В блоке `user` укажем контактные данные клиента.

- `CONNECTOR` — код коннектора, который передали в параметре `ID` метода [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md). Укажем `myconnector`

- `LINE` — идентификатор открытой линии. Укажем `107`

- `MESSAGES` — массив сообщений. Передадим данные клиента, сообщения и внешнего чата

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

   ```js
   BX24.callMethod(
       'imconnector.send.messages',
       {
           CONNECTOR: 'myconnector',
           LINE: 107,
           MESSAGES: [
               {
                   user: {
                       id: 'ext-user-42',
                       name: 'Иван',
                       phone: '+79990000000'
                   },
                   message: {
                       id: 'ext-msg-1001',
                       date: Math.floor(Date.now() / 1000),
                       text: 'Добрый день'
                   },
                   chat: {
                       id: 'channel-123',
                       name: 'Канал поддержки',
                       url: 'https://example.ru/chats/123'
                   }
               }
           ]
       },
       function(result)
       {
           if(result.error())
           {
               console.error(result.error());
           }
           else
           {
               console.dir(result.data());
           }
       }
   );
   ```

- PHP

   ```php
   require_once('crest.php');

   $result = CRest::call(
       'imconnector.send.messages',
       [
           'CONNECTOR' => 'myconnector',
           'LINE' => 107,
           'MESSAGES' => [
               [
                   'user' => [
                       'id' => 'ext-user-42',
                       'name' => 'Иван',
                       'phone' => '+79990000000',
                   ],
                   'message' => [
                       'id' => 'ext-msg-1001',
                       'date' => time(),
                       'text' => 'Добрый день',
                   ],
                   'chat' => [
                       'id' => 'channel-123',
                       'name' => 'Канал поддержки',
                       'url' => 'https://example.ru/chats/123',
                   ],
               ],
           ],
       ]
   );

   echo '<pre>' . htmlspecialchars(print_r($result, true), ENT_QUOTES, 'UTF-8') . '</pre>';
   ```

{% endlist %}

Если сообщение передано успешно, метод вернет данные сессии открытой линии в блоке `session`.

```json
{
    "result": {
        "SUCCESS": true,
        "DATA": {
            "RESULT": [
                {
                    "SUCCESS": true,
                    "session": {
                        "ID": "323",
                        "CHAT_ID": "1767"
                    }
                }
            ]
        }
    }
}
```

Если сообщение принято, в его результате `SUCCESS: true` и есть блок `session`: `result.DATA.RESULT[0].session` для первого сообщения в `MESSAGES`. Если `SUCCESS` равен `false`, причины перечислены в массиве `ERRORS` этого сообщения. Если `SUCCESS` равен `false` или блока `session` нет, не переходите к шагу 2: проверьте результат обработки сообщения и подключение коннектора к линии. Сохраните значения:

- `session.ID` — идентификатор сессии открытой линии

- `session.CHAT_ID` — идентификатор чата в Битрикс24. Он понадобится на следующем шаге

## 2\. Получим данные диалога

Получим данные чата методом [imopenlines.dialog.get](../../api-reference/imopenlines/openlines/sessions/imopenlines-dialog-get.md). В параметр `CHAT_ID` передадим значение `session.CHAT_ID` из ответа метода `imconnector.send.messages`. Примеры шагов выполняются отдельно: замените `1767` на свое значение `session.CHAT_ID`.

{% list tabs %}

- JS

   ```js
   BX24.callMethod(
       'imopenlines.dialog.get',
       {
           CHAT_ID: 1767
       },
       function(result)
       {
           if(result.error())
           {
               console.error(result.error());
           }
           else
           {
               const dialog = result.data();
               // значение поля Мессенджер для шага 3
               const imolValue = 'imol|' + dialog.entity_id;
               console.log(imolValue);
               // привязки CRM, которые уже есть у диалога
               console.log(dialog.entity_data_2);
           }
       }
   );
   ```

- PHP

   ```php
   require_once('crest.php');

   $result = CRest::call(
       'imopenlines.dialog.get',
       [
           'CHAT_ID' => 1767,
       ]
   );

   if (isset($result['error'])) {
       echo htmlspecialchars($result['error_description'], ENT_QUOTES, 'UTF-8');
   } else {
       // значение поля Мессенджер для шага 3
       $imolValue = 'imol|' . $result['result']['entity_id'];
       echo htmlspecialchars($imolValue, ENT_QUOTES, 'UTF-8') . '<br>';
       // привязки CRM, которые уже есть у диалога
       echo htmlspecialchars($result['result']['entity_data_2'], ENT_QUOTES, 'UTF-8');
   }
   ```

{% endlist %}

В ответе важны два поля:

- `entity_id` — код пользователя открытой линии в формате `<код коннектора>|<ID линии>|<ID внешнего чата>|<ID пользователя>`. Последняя часть — идентификатор пользователя, которого Битрикс24 создал для клиента, а не внешний идентификатор из `user.id`. По `entity_id` формируется значение поля Мессенджер в CRM

- `entity_data_2` — строка с привязками CRM, которые уже есть у диалога: пары «тип|идентификатор» для лида, компании, контакта и сделки, `0` — привязки нет. Сделку берите только отсюда: у сделки нет поля мессенджера, и шаг 3 ее не найдет

```json
{
    "result": {
        "id": 1767,
        "entity_type": "LINES",
        "entity_id": "myconnector|107|channel-123|1571",
        "entity_data_2": "LEAD|0|COMPANY|0|CONTACT|42|DEAL|0",
        "dialog_id": "chat1767"
    }
}
```

Если в `entity_data_2` у нужного типа указан ненулевой идентификатор, используйте его как текущую привязку диалога: в примере — контакт `42`. Шаг 3 находит объекты с тем же значением мессенджера. Он нужен, когда привязки нет или нужно найти объект другого типа. Чтобы убедиться, что найденный объект привязан к этому диалогу, сверьте его идентификатор с `entity_data_2`.

Чтобы получить значение поля Мессенджер в CRM, добавьте к `entity_id` префикс `imol|` — как в примерах кода выше. В примере это:

```text
imol|myconnector|107|channel-123|1571
```

## 3\. Найдем CRM-объект по полю мессенджера

Выполните точный поиск по полю мессенджера методом [crm.item.list](../../api-reference/crm/universal/crm-item-list.md). Передавайте тип CRM-объекта в параметре `entityTypeId`:

- `1` — лид
- `3` — контакт
- `4` — компания

В универсальных методах CRM значение мессенджера открытой линии доступно в поле `imol`. Все мультиполя объекта — телефоны, адреса электронной почты, мессенджеры — возвращает поле `fm`, если указать его в `select`.

У лида, контакта и компании поле `imol` содержит только первое значение мессенджера открытой линии. Если значение текущего диалога отличается от первого сохраненного значения, поиск не найдет этот объект. Поэтому сначала проверьте привязку в `entity_data_2`, а пустой результат поиска не считайте доказательством, что объекта нет.

В примере найдем контакт, поэтому передадим `entityTypeId = 3`. Замените пример `imolValue` значением, полученным на шаге 2.

- `entityTypeId` — тип CRM-объекта. Для контакта укажите `3`

- `filter[=imol]` — значение `imolValue` из шага 2: префикс `imol|` и `entity_id` из ответа метода `imopenlines.dialog.get`

- `select` — список полей, которые нужно вернуть. Для поиска идентификатора достаточно поля `id`, в примере добавлено `imol` для проверки

{% list tabs %}

- JS

   ```js
   // imolValue — значение из шага 2
   const imolValue = 'imol|myconnector|107|channel-123|1571';

   BX24.callMethod(
       'crm.item.list',
       {
           entityTypeId: 3,
           select: [
               'id',
               'imol'
           ],
           filter: {
               '=imol': imolValue
           }
       },
       function(result)
       {
           if(result.error())
           {
               console.error(result.error());
           }
           else
           {
               console.dir(result.data());
           }
       }
   );
   ```

- PHP

   ```php
   require_once('crest.php');

   // $imolValue — значение из шага 2
   $imolValue = 'imol|myconnector|107|channel-123|1571';

   $result = CRest::call(
       'crm.item.list',
       [
           'entityTypeId' => 3,
           'select' => [
               'id',
               'imol',
           ],
           'filter' => [
               '=imol' => $imolValue,
           ],
       ]
   );

   echo '<pre>' . htmlspecialchars(print_r($result, true), ENT_QUOTES, 'UTF-8') . '</pre>';
   ```

{% endlist %}

Если контакт найден, метод вернет его данные в массиве `items`.

```json
{
    "result": {
        "items": [
            {
                "id": 42,
                "imol": "imol|myconnector|107|channel-123|1571"
            }
        ]
    },
    "total": 1
}
```

Значение `items[0].id` — идентификатор найденного CRM-объекта. В примере найден контакт с идентификатором `42`.

Если `items` — пустой массив, контакт с таким первым значением мессенджера не найден. Для лида и компании повторите запрос с `entityTypeId = 1` и `entityTypeId = 4`.

## Проверим результат

Откройте в CRM карточку с идентификатором `items[0].id` и проверьте, что в поле Мессенджер указан канал открытой линии. Текущую привязку диалога к объекту подтверждает идентификатор этого объекта в `entity_data_2` из шага 2.

## Если CRM-объект не найден

Проверьте значения, которые связывают шаги сценария:

- в ответе `imconnector.send.messages` есть блок `session` с `CHAT_ID`
- в запрос `imopenlines.dialog.get` передан `CHAT_ID` из ответа `imconnector.send.messages`
- в ответе `imopenlines.dialog.get` есть непустое поле `entity_id`
- в фильтр `crm.item.list` передано значение с префиксом `imol|`, например `imol|myconnector|107|channel-123|1571`
- в `entityTypeId` указан тип CRM-объекта, который CRM-трекер мог создать или привязать к диалогу: `1`, `3` или `4`
- в настройках открытой линии включена работа с CRM и задан нужный тип создаваемого объекта. После изменения настроек проверьте сценарий на новом обращении
- пользователь, от имени которого выполняется `crm.item.list`, имеет право на чтение найденного CRM-объекта

Если метод вернул ошибку, проверьте данные запроса.

- `NOT_ACTIVE_LINE` от `imconnector.send.messages` — линия с таким `LINE` неактивна или коннектор не подключен к ней. Проверьте идентификатор линии и подключение коннектора и повторите шаг 1
- `WRONG_AUTH_TYPE` от `imconnector.send.messages` — запрос выполнен не в контексте приложения. Вызовите метод с авторизацией приложения и повторите шаг 1
- `ACCESS_ERROR` от `imopenlines.dialog.get` — чат с таким `CHAT_ID` не найден или у пользователя нет доступа к диалогу. Проверьте `CHAT_ID` из шага 1 и повторите шаг 2
- `INVALID_ARG_VALUE` от `crm.item.list` — неверный параметр запроса, например в фильтре указано поле, по которому нельзя фильтровать. Текст ошибки называет поле. Фильтр `=imol` работает только для лида, контакта и компании: с `entityTypeId = 2` метод вернет эту ошибку. Проверьте поле и `entityTypeId` и повторите шаг 3

## Что важно учитывать

- Передавайте в `email` только настоящий адрес клиента: по нему CRM-трекер ищет существующие контакты и компании
- Проверяйте несколько типов CRM-объектов: CRM-трекер может создать лид или контакт либо привязать диалог к существующей компании
