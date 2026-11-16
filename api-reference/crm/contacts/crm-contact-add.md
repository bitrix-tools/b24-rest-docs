# Создать новый контакт crm.contact.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на добавление контактов; в режиме импорта — пользователь с правом на импорт контактов

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.contact.add](../rest-v3/items/crm-entity-add-rest-v3.md).

{% endnote %}

Метод `crm.contact.add` создает новый контакт.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**
[`object`](../../data-types.md) | Объект формата:

```text
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля
- `value_n` — значение поля

Список доступных полей описан [ниже](#parameter-fields).

Некорректное поле в `fields` будет проигнорировано ||
|| **params**
[`object`](../../data-types.md) | Объект, содержащий набор дополнительных параметров.

Структура и возможные значения описаны [ниже](#parameter-params) ||
|#

### Параметр fields {#parameter-fields}

Если `NAME` и `LAST_NAME` не заполнены, контакт создается с фамилией `Контакт #N`, где `N` — идентификатор нового контакта.

#|
|| **Название**
`тип` | **Описание** ||
|| **HONORIFIC**
[`crm_status`](../data-types.md) | Обращение.

Список доступных типов обращений можно узнать с помощью метода [`crm.status.list`](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "HONORIFIC" }`.

По умолчанию обращение не задано ||
|| **NAME**
[`string`](../../data-types.md) | Имя ||
|| **SECOND_NAME**
[`string`](../../data-types.md) | Отчество ||
|| **LAST_NAME**
[`string`](../../data-types.md) | Фамилия ||
|| **PHOTO**
[`file`](../../data-types.md) | Фотография ||
|| **BIRTHDATE**
[`date`](../../data-types.md) | Дата рождения. Принимает формат `YYYY-MM-DD` и формат даты Битрикс24, например `11.11.2001`. Некорректная дата не сохраняется, ошибки при этом нет ||
|| **TYPE_ID**
[`crm_status`](../data-types.md) | Тип контакта.

Список доступных типов контакта можно узнать с помощью метода [`crm.status.list`](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "CONTACT_TYPE" }`.

По умолчанию — первый доступный тип контакта ||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Источник.

Список доступных типов источника можно узнать с помощью метода [`crm.status.list`](../status/crm-status-list.md), применив фильтр `{ ENTITY_ID: "SOURCE" }`.

По умолчанию — первый доступный тип источника ||
|| **SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно об источнике ||
|| **POST**
[`string`](../../data-types.md) | Должность ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарий. Поддерживает bb-коды ||
|| **OPENED**
[`boolean`](../../data-types.md) | Доступен ли для всех. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y`. Значение по умолчанию может быть изменено в настройках CRM ||
|| **EXPORT**
[`boolean`](../../data-types.md) | Участвует ли контакт в экспорте. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y` ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя, ответственного за контакт.

По умолчанию — идентификатор пользователя, который вызывает метод ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор основной компании для контакта.

Список компаний можно получить с помощью метода [`crm.item.list`](../universal/crm-item-list.md) по `entityTypeId = 4` ||
|| **COMPANY_IDS**
[`crm_company[]`](../data-types.md) | Массив идентификаторов компаний, к которым привязан контакт.

Список компаний можно получить с помощью метода [`crm.item.list`](../universal/crm-item-list.md) по `entityTypeId = 4`  ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие)  ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. Например, `CPC` — объявления, `CPM` — баннеры ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **TRACE**
[`string`](../../data-types.md) | Информация для [сквозной аналитики](../../../tutorials/crm/how-to-use-analitycs/use-analitics-for-add-contact.md) ||
|| **PHONE**
[`crm_multifield[]`](../data-types.md#crm_multifield) | Телефон. Массив объектов с ключами `VALUE` и `VALUE_TYPE`, например `[{"VALUE": "+79001234567", "VALUE_TYPE": "WORK"}]` ||
|| **EMAIL**
[`crm_multifield[]`](../data-types.md#crm_multifield) | E-mail ||
|| **WEB**
[`crm_multifield[]`](../data-types.md#crm_multifield) | Сайт ||
|| **IM**
[`crm_multifield[]`](../data-types.md#crm_multifield) | Мессенджер ||
|| **LINK**
[`crm_multifield[]`](../data-types.md#crm_multifield) | Ссылки. Служебное поле ||
||**UF_...**
[`any`](../../data-types.md) | Пользовательские поля. Например, `UF_CRM_25534736`.

В зависимости от настроек Битрикс24 у контактов может быть набор пользовательских полей определенных типов.

Добавить пользовательское поле в контакт можно с помощью метода [crm.contact.userfield.add](./userfield/crm-contact-userfield-add.md) ||
||**PARENT_ID_...**
[`crm_entity`](../data-types.md) | Поля связей.

Если смарт-процесс связан с контактами как родительский, поле `PARENT_ID_...` хранит идентификатор его элемента. Например, `PARENT_ID_153` — идентификатор элемента родительского смарт-процесса с `entityTypeId=153` ||
|#

**Поля связи с внешними источниками данных**

Поля заполняются, если контакт создан внешней системой.

#|
|| **Название**
`тип` | **Описание** ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор внешней системы, являющейся источником данных об этом контакте ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор контакта во внешней системе ||
|| **ORIGIN_VERSION**
[`string`](../../data-types.md) | Версия данных контакта во внешней системе ||
|#

**Импорт**

Эти поля можно заполнить, только если в `params` передан `IMPORT = 'Y'` и у пользователя есть права администратора на контакты.

#|
|| **Название**
`тип` | **Описание** ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания.

Не может быть раньше даты создания последнего контакта или позже текущего времени
||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения.

Не может быть раньше `DATE_CREATE` или позже текущего времени ||
|| **CREATED_BY_ID**
[`user`](../../data-types.md) | Кем создан ||
|| **MODIFY_BY_ID**
[`user`](../../data-types.md) | Кем изменен ||
|#

**Устаревшие поля**

Поля адреса в контакте устарели и работают только в режиме совместимости. Для работы с адресом используйте [реквизиты](../requisites/index.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **ADDRESS**
[`string`](../../data-types.md) | Адрес ||
|| **ADDRESS_2**
[`string`](../../data-types.md) | Вторая строка адреса ||
|| **ADDRESS_CITY**
[`string`](../../data-types.md) | Город ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../../data-types.md) | Почтовый индекс ||
|| **ADDRESS_REGION**
[`string`](../../data-types.md) | Район ||
|| **ADDRESS_PROVINCE**
[`string`](../../data-types.md) | Область ||
|| **ADDRESS_COUNTRY**
[`string`](../../data-types.md) | Страна ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../../data-types.md) | Код страны ||
|| **ADDRESS_LOC_ADDR_ID**
[`integer`](../../data-types.md) | Идентификатор адреса местоположения ||
|#

### Параметр params {#parameter-params}

#|
|| **Название**
`тип` | **Описание** ||
|| **REGISTER_SONET_EVENT**
[`boolean`](../../data-types.md) | Параметр принимается для совместимости и на создание контакта не влияет: метод его не учитывает ||
|| **IMPORT**
[`boolean`](../../data-types.md) | Включен ли режим импорта. Возможные значения:
- `Y` — да

Чтобы выключить импорт, не передавайте параметр или передайте `0` либо пустую строку. Не передавайте `N`: строка `N` включает режим импорта.

По умолчанию режим импорта выключен ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FIELDS":{"HONORIFIC":"HNR_RU_1","NAME":"Иван","SECOND_NAME":"Иванович","LAST_NAME":"Иванов","PHOTO":{"fileData":"**put_photo_data_here**"},"BIRTHDATE":"11.11.2001","TYPE_ID":"PARTNER","SOURCE_ID":"WEB","SOURCE_DESCRIPTION":"*Дополнительно об источнике*","POST":"Администратор","COMMENTS":"**put_comment_here**","OPENED":"Y","EXPORT":"N","ASSIGNED_BY_ID":6,"COMPANY_ID":12,"COMPANY_IDS":[12,13,15],"UTM_SOURCE":"yandex","UTM_MEDIUM":"CPC","UTM_CAMPAIGN":"summer_sale","UTM_CONTENT":"header_banner","UTM_TERM":"discount","PHONE":[{"VALUE":"+7333333555","VALUE_TYPE":"WORK"},{"VALUE":"+35599888666","VALUE_TYPE":"HOME"}],"EMAIL":[{"VALUE":"ivanov@example.mailing","VALUE_TYPE":"MAILING"},{"VALUE":"ivanov@example.work","VALUE_TYPE":"WORK"}],"UF_CRM_1720697698689":"Пример значения пользовательского поля с типом \"Строка\"","PARENT_ID_1224":12}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FIELDS":{"HONORIFIC":"HNR_RU_1","NAME":"Иван","SECOND_NAME":"Иванович","LAST_NAME":"Иванов","PHOTO":{"fileData":"**put_photo_data_here**"},"BIRTHDATE":"11.11.2001","TYPE_ID":"PARTNER","SOURCE_ID":"WEB","SOURCE_DESCRIPTION":"*Дополнительно об источнике*","POST":"Администратор","COMMENTS":"**put_comment_here**","OPENED":"Y","EXPORT":"N","ASSIGNED_BY_ID":6,"COMPANY_ID":12,"COMPANY_IDS":[12,13,15],"UTM_SOURCE":"yandex","UTM_MEDIUM":"CPC","UTM_CAMPAIGN":"summer_sale","UTM_CONTENT":"header_banner","UTM_TERM":"discount","PHONE":[{"VALUE":"+7333333555","VALUE_TYPE":"WORK"},{"VALUE":"+35599888666","VALUE_TYPE":"HOME"}],"EMAIL":[{"VALUE":"ivanov@example.mailing","VALUE_TYPE":"MAILING"},{"VALUE":"ivanov@example.work","VALUE_TYPE":"WORK"}],"UF_CRM_1720697698689":"Пример значения пользовательского поля с типом \"Строка\"","PARENT_ID_1224":12},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'crm.contact.add',
        params: {
          fields: {
            HONORIFIC: 'HNR_RU_1',
            NAME: 'Ivan',
            SECOND_NAME: 'Ivanovich',
            LAST_NAME: 'Ivanov',
            PHOTO: {
              fileData: document.getElementById('photo'),
            },
            BIRTHDATE: '11.11.2001',
            TYPE_ID: 'PARTNER',
            SOURCE_ID: 'WEB',
            SOURCE_DESCRIPTION: '*Additional source details*',
            POST: 'Administrator',
            COMMENTS: `
              Example comment inside the contact

              [B]Bold text[/B]
              [I]Italic[/I]
              [U]Underlined[/U]
              [S]Strikethrough[/S]
              [B][I][U][S]Mix[/S][/U][/I][/B]

              [LIST]
              [*]List item #1
              [*]List item #2
              [*]List item #3
              [/LIST]

              [LIST=1]
              [*]Numbered list item #1
              [*]Numbered list item #2
              [*]Numbered list item #3
              [/LIST]
            `,
            OPENED: 'Y',
            EXPORT: 'N',
            ASSIGNED_BY_ID: 6,
            COMPANY_ID: 12,
            COMPANY_IDS: [12, 13, 15],
            UTM_SOURCE: 'yandex',
            UTM_MEDIUM: 'CPC',
            UTM_CAMPAIGN: 'summer_sale',
            UTM_CONTENT: 'header_banner',
            UTM_TERM: 'discount',
            PHONE: [
              {
                VALUE: '+7333333555',
                VALUE_TYPE: 'WORK',
              },
              {
                VALUE: '+35599888666',
                VALUE_TYPE: 'HOME',
              },
            ],
            EMAIL: [
              {
                VALUE: 'ivanov@example.mailing',
                VALUE_TYPE: 'MAILING',
              },
              {
                VALUE: 'ivanov@example.work',
                VALUE_TYPE: 'WORK',
              },
            ],
            UF_CRM_1720697698689: 'Example value of a custom field of type "String"',
            PARENT_ID_1224: 12,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created contact id:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addContact() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.add',
            params: {
              fields: {
                HONORIFIC: 'HNR_RU_1',
                NAME: 'Ivan',
                SECOND_NAME: 'Ivanovich',
                LAST_NAME: 'Ivanov',
                PHOTO: {
                  fileData: document.getElementById('photo'),
                },
                BIRTHDATE: '11.11.2001',
                TYPE_ID: 'PARTNER',
                SOURCE_ID: 'WEB',
                SOURCE_DESCRIPTION: '*Additional source details*',
                POST: 'Administrator',
                COMMENTS: `
                  Example comment inside the contact

                  [B]Bold text[/B]
                  [I]Italic[/I]
                  [U]Underlined[/U]
                  [S]Strikethrough[/S]
                  [B][I][U][S]Mix[/S][/U][/I][/B]

                  [LIST]
                  [*]List item #1
                  [*]List item #2
                  [*]List item #3
                  [/LIST]

                  [LIST=1]
                  [*]Numbered list item #1
                  [*]Numbered list item #2
                  [*]Numbered list item #3
                  [/LIST]
                `,
                OPENED: 'Y',
                EXPORT: 'N',
                ASSIGNED_BY_ID: 6,
                COMPANY_ID: 12,
                COMPANY_IDS: [12, 13, 15],
                UTM_SOURCE: 'yandex',
                UTM_MEDIUM: 'CPC',
                UTM_CAMPAIGN: 'summer_sale',
                UTM_CONTENT: 'header_banner',
                UTM_TERM: 'discount',
                PHONE: [
                  {
                    VALUE: '+7333333555',
                    VALUE_TYPE: 'WORK',
                  },
                  {
                    VALUE: '+35599888666',
                    VALUE_TYPE: 'HOME',
                  },
                ],
                EMAIL: [
                  {
                    VALUE: 'ivanov@example.mailing',
                    VALUE_TYPE: 'MAILING',
                  },
                  {
                    VALUE: 'ivanov@example.work',
                    VALUE_TYPE: 'WORK',
                  },
                ],
                UF_CRM_1720697698689: 'Example value of a custom field of type "String"',
                PARENT_ID_1224: 12,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created contact id:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addContact)
    </script>
    ```

- PHP

    ```php        
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.contact.add',
                [
                    'fields' => [
                        'HONORIFIC' => 'HNR_RU_1',
                        'NAME' => 'Иван',
                        'SECOND_NAME' => 'Иванович',
                        'LAST_NAME' => 'Иванов',
                        'BIRTHDATE' => '11.11.2001',
                        'TYPE_ID' => 'PARTNER',
                        'SOURCE_ID' => 'WEB',
                        'SOURCE_DESCRIPTION' => '*Дополнительно об источнике*',
                        'POST' => 'Администратор',
                        'COMMENTS' => '
                            Пример комментария внутри контакта

                            [B]Жирный текст[/B]
                            [I]Курсив[/I]
                            [U]Подчеркнутый[/U]
                            [S]Зачеркнутый[/S]
                            [B][I][U][S]Микс[/S][/U][/I][/B]

                            [LIST]
                            [*]Элемент списка #1
                            [*]Элемент списка #2
                            [*]Элемент списка #3
                            [/LIST]

                            [LIST=1]
                            [*]Нумерованный элемент списка #1
                            [*]Нумерованный элемент списка #2
                            [*]Нумерованный элемент списка #3
                            [/LIST]
                        ',
                        'OPENED' => 'Y',
                        'EXPORT' => 'N',
                        'ASSIGNED_BY_ID' => 6,
                        'COMPANY_ID' => 12,
                        'COMPANY_IDS' => [12, 13, 15],
                        'UTM_SOURCE' => 'yandex',
                        'UTM_MEDIUM' => 'CPC',
                        'UTM_CAMPAIGN' => 'summer_sale',
                        'UTM_CONTENT' => 'header_banner',
                        'UTM_TERM' => 'discount',
                        'PHONE' => [
                            [
                                'VALUE' => '+7333333555',
                                'VALUE_TYPE' => 'WORK',
                            ],
                            [
                                'VALUE' => '+35599888666',
                                'VALUE_TYPE' => 'HOME',
                            ]
                        ],
                        'EMAIL' => [
                            [
                                'VALUE' => 'ivanov@example.mailing',
                                'VALUE_TYPE' => 'MAILING',
                            ],
                            [
                                'VALUE' => 'ivanov@example.work',
                                'VALUE_TYPE' => 'WORK',
                            ]
                        ],
                        'UF_CRM_1720697698689' => 'Пример значения пользовательского поля с типом "Строка"',
                        'PARENT_ID_1224' => 12,
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding contact: ' . $e->getMessage();
    }
    ```
- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.add',
        {
            fields: {
                HONORIFIC: "HNR_RU_1",
                NAME: "Иван",
                SECOND_NAME: "Иванович",
                LAST_NAME: "Иванов",
                PHOTO: {
                    fileData: document.getElementById('photo'),
                },
                BIRTHDATE: '11.11.2001',
                TYPE_ID: "PARTNER",
                SOURCE_ID: "WEB",
                SOURCE_DESCRIPTION: "*Дополнительно об источнике*",
                POST: "Администратор",
                COMMENTS: `
                    Пример комментария внутри контакта

                    [B]Жирный текст[/B]
                    [I]Курсив[/I]
                    [U]Подчеркнутый[/U]
                    [S]Зачеркнутый[/S]
                    [B][I][U][S]Микс[/S][/U][/I][/B]

                    [LIST]
                    [*]Элемент списка #1
                    [*]Элемент списка #2
                    [*]Элемент списка #3
                    [/LIST]

                    [LIST=1]
                    [*]Нумерованный элемент списка #1
                    [*]Нумерованный элемент списка #2
                    [*]Нумерованный элемент списка #3
                    [/LIST]
                `,
                OPENED: "Y",
                EXPORT: "N",
                ASSIGNED_BY_ID: 6,
                COMPANY_ID: 12,
                COMPANY_IDS: [12, 13, 15],
                UTM_SOURCE: "yandex",
                UTM_MEDIUM: "CPC",
                UTM_CAMPAIGN: "summer_sale",
                UTM_CONTENT: "header_banner",
                UTM_TERM: "discount",
                PHONE: [
                    {
                        VALUE: "+7333333555",
                        VALUE_TYPE: "WORK",
                    },
                    {
                        VALUE: "+35599888666",
                        VALUE_TYPE: "HOME",
                    }
                ],
                EMAIL: [
                    {
                        VALUE: "ivanov@example.mailing",
                        VALUE_TYPE: "MAILING",
                    },
                    {
                        VALUE: "ivanov@example.work",
                        VALUE_TYPE: "WORK",
                    }
                ],
                UF_CRM_1720697698689: "Пример значения пользовательского поля с типом \"Строка\"",
                PARENT_ID_1224: 12,
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.contact.add',
        [
            'fields' => [
                'HONORIFIC' => 'HNR_RU_1',
                'NAME' => 'Иван',
                'SECOND_NAME' => 'Иванович',
                'LAST_NAME' => 'Иванов',
                'BIRTHDATE' => '11.11.2001',
                'TYPE_ID' => 'PARTNER',
                'SOURCE_ID' => 'WEB',
                'SOURCE_DESCRIPTION' => '*Дополнительно об источнике*',
                'POST' => 'Администратор',
                'COMMENTS' => '
                    Пример комментария внутри контакта

                    [B]Жирный текст[/B]
                    [I]Курсив[/I]
                    [U]Подчеркнутый[/U]
                    [S]Зачеркнутый[/S]
                    [B][I][U][S]Микс[/S][/U][/I][/B]

                    [LIST]
                    [*]Элемент списка #1
                    [*]Элемент списка #2
                    [*]Элемент списка #3
                    [/LIST]

                    [LIST=1]
                    [*]Нумерованный элемент списка #1
                    [*]Нумерованный элемент списка #2
                    [*]Нумерованный элемент списка #3
                    [/LIST]
                ',
                'OPENED' => 'Y',
                'EXPORT' => 'N',
                'ASSIGNED_BY_ID' => 6,
                'COMPANY_ID' => 12,
                'COMPANY_IDS' => [12, 13, 15],
                'UTM_SOURCE' => 'yandex',
                'UTM_MEDIUM' => 'CPC',
                'UTM_CAMPAIGN' => 'summer_sale',
                'UTM_CONTENT' => 'header_banner',
                'UTM_TERM' => 'discount',
                'PHONE' => [
                    [
                        'VALUE' => '+7333333555',
                        'VALUE_TYPE' => 'WORK',
                    ],
                    [
                        'VALUE' => '+35599888666',
                        'VALUE_TYPE' => 'HOME',
                    ]
                ],
                'EMAIL' => [
                    [
                        'VALUE' => 'ivanov@example.mailing',
                        'VALUE_TYPE' => 'MAILING',
                    ],
                    [
                        'VALUE' => 'ivanov@example.work',
                        'VALUE_TYPE' => 'WORK',
                    ]
                ],
                'UF_CRM_1720697698689' => 'Пример значения пользовательского поля с типом "Строка"',
                'PARENT_ID_1224' => 12,
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.contact.add", b24.Params{
    	"fields": b24.Params{
    		"HONORIFIC":   "HNR_RU_1",
    		"NAME":        "Иван",
    		"SECOND_NAME": "Иванович",
    		"LAST_NAME":   "Иванов",
    		"PHOTO": b24.Params{
    			"fileData": "**put_photo_data_here**",
    		},
    		"BIRTHDATE":          "11.11.2001",
    		"TYPE_ID":            "PARTNER",
    		"SOURCE_ID":          "WEB",
    		"SOURCE_DESCRIPTION": "*Дополнительно об источнике*",
    		"POST":               "Администратор",
    		"COMMENTS":           "**put_comment_here**",
    		"OPENED":             "Y",
    		"EXPORT":             "N",
    		"ASSIGNED_BY_ID":     6,
    		"COMPANY_ID":         12,
    		"COMPANY_IDS":        []int{12, 13, 15},
    		"UTM_SOURCE":         "yandex",
    		"UTM_MEDIUM":         "CPC",
    		"UTM_CAMPAIGN":       "summer_sale",
    		"UTM_CONTENT":        "header_banner",
    		"UTM_TERM":           "discount",
    		"PHONE": []b24.Params{
    			{
    				"VALUE":      "+7333333555",
    				"VALUE_TYPE": "WORK",
    			},
    			{
    				"VALUE":      "+35599888666",
    				"VALUE_TYPE": "HOME",
    			},
    		},
    		"EMAIL": []b24.Params{
    			{
    				"VALUE":      "ivanov@example.mailing",
    				"VALUE_TYPE": "MAILING",
    			},
    			{
    				"VALUE":      "ivanov@example.work",
    				"VALUE_TYPE": "WORK",
    			},
    		},
    		"UF_CRM_1720697698689": "Пример значения пользовательского поля с типом \"Строка\"",
    		"PARENT_ID_1224":       12,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.contact.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 46,
    "time": {
        "start": 1723713732.235658,
        "finish": 1723713733.742049,
        "duration": 1.5063910484313965,
        "processing": 1.1416668891906738,
        "date_start": "2024-08-15T11:22:12+02:00",
        "date_finish": "2024-08-15T11:22:13+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Корневой элемент ответа, содержит идентификатор созданного контакта ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'fields' must be array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Parameter 'fields' must be array.` | В параметр `fields` передан не объект ||
|| `400` | Пустое значение | `Parameter 'params' must be array.` | В параметр `params` передан не объект ||
|| `400` | Пустое значение | `Access denied.` | Нет права на добавление контактов или, в режиме импорта, на импорт контактов ||
|| `400` | Пустое значение | Исчерпан выделенный дисковый ресурс | Не хватает места на диске для сохранения файла ||
|| `400` | Пустое значение | `Установить значение поля "Когда создан" может только администратор` | В режиме импорта переданы `DATE_CREATE`, `DATE_MODIFY`, `CREATED_BY_ID` или `MODIFY_BY_ID`, а у пользователя нет прав администратора на контакты. Название поля в тексте меняется ||
|| `400` | Пустое значение | `Значение поля "Когда создан" не может быть меньше, чем у какого-либо из существующих элементов` | В режиме импорта `DATE_CREATE` раньше даты создания последнего контакта ||
|| `400` | Пустое значение | `Значение поля "Когда создан" не может быть в будущем времени` | В режиме импорта `DATE_CREATE` или `DATE_MODIFY` позже текущего времени. Название поля в тексте меняется ||
|| `400` | `ERROR_CORE` | `Поле "Рабочий e-mail" содержит некорректный адрес.<br>` | В `EMAIL` передан некорректный адрес. Название поля в тексте зависит от `VALUE_TYPE` ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-update.md)
- [{#T}](./crm-contact-get.md)
- [{#T}](./crm-contact-list.md)
- [{#T}](./crm-contact-delete.md)
- [{#T}](./crm-contact-fields.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-contact.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-contact-with-requisite.md)
- [{#T}](../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)
