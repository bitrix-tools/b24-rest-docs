# Получить контакт по идентификатору crm.contact.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение контактов

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.contact.get](../rest-v3/items/crm-entity-get-rest-v3.md).

{% endnote %}

Метод `crm.contact.get` возвращает контакт по его идентификатору.

Метод возвращает только контакты из общего направления. Контакт из другого направления, например «Контакты поставщика», метод не находит и возвращает ошибку `Not found`. Такие контакты получайте методом [crm.item.get](../universal/crm-item-get.md) с `entityTypeId=3`.

Чтобы получить список компаний, привязанных к контакту, используйте метод [`crm.contact.company.items.get`](company/crm-contact-company-items-get.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор контакта. Можно получить при помощи методов [`crm.contact.list`](crm-contact-list.md) или [`crm.contact.add`](crm-contact-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить контакт с `id = 23`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":23}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":23,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CrmContactResult = {
      ID: string
      NAME: string
      LAST_NAME: string | null
      TYPE_ID: string
      SOURCE_ID: string
      COMPANY_ID: string | null
      ASSIGNED_BY_ID: string
      OPENED: string
      BIRTHDATE: ISODate | '' | null
      DATE_CREATE: ISODate | null
      DATE_MODIFY: ISODate | null
      LAST_ACTIVITY_TIME: ISODate | null
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmContactResult>({
        method: 'crm.contact.get',
        params: {
          id: 23,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contact:', result.ID, result.NAME, result.LAST_NAME)
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
      async function getContact() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.get',
            params: {
              id: 23,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Contact:', result.ID, result.NAME, result.LAST_NAME)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getContact)
    </script>
    ```

- PHP

    ```php        
    try {
        $contactId = 23; // Example contact ID
        $contactResult = $serviceBuilder
            ->getCRMScope()
            ->contact()
            ->get($contactId);
        $itemResult = $contactResult->contact();
        print("ID: " . $itemResult->ID . PHP_EOL);
        print("Name: " . $itemResult->NAME . PHP_EOL);
        print("Last Name: " . $itemResult->LAST_NAME . PHP_EOL);
        print("Birthday: " . $itemResult->BIRTHDATE?->format(DATE_ATOM) . PHP_EOL);
        print("Created Date: " . $itemResult->DATE_CREATE->format(DATE_ATOM) . PHP_EOL);
        print("Modified Date: " . $itemResult->DATE_MODIFY->format(DATE_ATOM) . PHP_EOL);
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage() . PHP_EOL);
    }
    ```
- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.get',
        {
            id: 23,
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
        'crm.contact.get',
        [
            'id' => 23
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.contact.get", b24.Params{
    	"id": 23,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.contact.get: %w", err)
    }

    var item struct {
    	ID         b24.ID `json:"ID"`
    	Post       string `json:"POST"`
    	Comments   string `json:"COMMENTS"`
    	Honorific  string `json:"HONORIFIC"`
    	Name       string `json:"NAME"`
    	SecondName string `json:"SECOND_NAME"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Post)
    ```

{% endlist %}

## Обработка ответа

Ключи и значения системных полей, закрытых для пользователя [настройкой видимости системных полей](../index.md#system-field-visibility), не возвращаются. Видимость определяется для воронки или категории элемента.

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "23",
        "POST": "Администратор",
        "COMMENTS": "\nПример комментария внутри контакта\n\n[B]Жирный текст[\/B]\n[I]Курсив[\/I]\n[U]Подчеркнутый[\/U]\n[S]Зачеркнутый[\/S]\n[B][I][U][S]Микс[\/S][\/U][\/I][\/B]\n\n[LIST]\n[*]Элемент списка #1\n[*]Элемент списка #2\n[*]Элемент списка #3\n[\/LIST]\n\n[LIST=1]\n[*]Нумерованный элемент списка #1\n[*]Нумерованный элемент списка #2\n[*]Нумерованный элемент списка #3\n[\/LIST]\n",
        "HONORIFIC": "HNR_RU_1",
        "NAME": "Иван",
        "SECOND_NAME": "Иванович",
        "LAST_NAME": "Иванов",
        "PHOTO": null,
        "LEAD_ID": null,
        "TYPE_ID": "PARTNER",
        "SOURCE_ID": "WEB",
        "SOURCE_DESCRIPTION": "*Дополнительно об источнике*",
        "COMPANY_ID": "12",
        "BIRTHDATE": "2001-11-11T02:00:00+02:00",
        "EXPORT": "N",
        "HAS_PHONE": "Y",
        "HAS_EMAIL": "Y",
        "HAS_IMOL": "N",
        "DATE_CREATE": "2024-08-15T10:38:21+02:00",
        "DATE_MODIFY": "2024-08-15T10:38:21+02:00",
        "ASSIGNED_BY_ID": "6",
        "CREATED_BY_ID": "1",
        "MODIFY_BY_ID": "1",
        "OPENED": "Y",
        "ORIGINATOR_ID": null,
        "ORIGIN_ID": null,
        "ORIGIN_VERSION": null,
        "LAST_ACTIVITY_TIME": "2024-08-15T10:38:21+02:00",
        "ADDRESS": null,
        "ADDRESS_2": null,
        "ADDRESS_CITY": null,
        "ADDRESS_POSTAL_CODE": null,
        "ADDRESS_REGION": null,
        "ADDRESS_PROVINCE": null,
        "ADDRESS_COUNTRY": null,
        "ADDRESS_LOC_ADDR_ID": null,
        "UTM_SOURCE": "yandex",
        "UTM_MEDIUM": "CPC",
        "UTM_CAMPAIGN": "summer_sale",
        "UTM_CONTENT": "header_banner",
        "UTM_TERM": "discount",
        "PARENT_ID_1224": "12",
        "LAST_ACTIVITY_BY": "1",
        "UF_CRM_1720697698689": "Пример значения пользовательского поля с типом \u0022Строка\u0022",
        "PHONE": [
        {
            "ID": "156",
            "VALUE_TYPE": "WORK",
            "VALUE": "+7333333555",
            "TYPE_ID": "PHONE"
        },
        {
            "ID": "157",
            "VALUE_TYPE": "HOME",
            "VALUE": "+35599888666",
            "TYPE_ID": "PHONE"
        }
        ],
        "EMAIL": [
        {
            "ID": "158",
            "VALUE_TYPE": "MAILING",
            "VALUE": "ivanov@example.mailing",
            "TYPE_ID": "EMAIL"
        },
        {
            "ID": "159",
            "VALUE_TYPE": "WORK",
            "VALUE": "ivanov@example.work",
            "TYPE_ID": "EMAIL"
        }
        ]
    },
    "time": {
        "start": 1723736139.883652,
        "finish": 1723736140.299369,
        "duration": 0.41571712493896484,
        "processing": 0.14158892631530762,
        "date_start": "2024-08-15T17:35:39+02:00",
        "date_finish": "2024-08-15T17:35:40+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`contact`](#contact) | Корневой элемент ответа. Содержит информацию о полях контакта. Структура описана [ниже](#contact) ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Объект contact {#contact}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор контакта ||
|| **POST**
[`string`](../../data-types.md) | Должность ||
|| **COMMENTS**
[`text`](../../data-types.md) | Комментарий ||
|| **HONORIFIC**
[`crm_status`](../data-types.md) | Обращение ||
|| **NAME**
[`string`](../../data-types.md) | Имя ||
|| **SECOND_NAME**
[`string`](../../data-types.md) | Отчество ||
|| **LAST_NAME**
[`string`](../../data-types.md) | Фамилия ||
|| **PHOTO**
[`file`](../../data-types.md) | Фотография. Объект с полями `id` — идентификатор файла, `showUrl` — ссылка для просмотра, `downloadUrl` — ссылка для скачивания. Если фото нет — `null` ||
|| **LEAD_ID**
[`crm_lead`](../data-types.md) | Идентификатор лида, на основе которого был создан контакт ||
|| **TYPE_ID**
[`crm_status`](../data-types.md) | Тип контакта ||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Источник ||
|| **SOURCE_DESCRIPTION**
[`text`](../../data-types.md) | Дополнительно об источнике ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор основной компании. Устаревшее поле: контакт может быть привязан к нескольким компаниям, их список возвращает метод [crm.contact.company.items.get](./company/crm-contact-company-items-get.md) ||
|| **BIRTHDATE**
[`date`](../../data-types.md) | Дата рождения. Возвращается строкой с датой, временем и часовым поясом, например `2001-11-11T03:00:00+03:00`. Если дата не задана — пустая строка ||
|| **EXPORT**
[`char`](../../data-types.md) | Участвует ли в экспорте контактов. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **HAS_PHONE**
[`char`](../../data-types.md) | Задан ли телефон. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **HAS_EMAIL**
[`char`](../../data-types.md) | Задан ли e-mail. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **HAS_IMOL**
[`char`](../../data-types.md) | Задана ли открытая линия. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Ответственный ||
|| **CREATED_BY_ID**
[`user`](../../data-types.md) | Кем создан ||
|| **MODIFY_BY_ID**
[`user`](../../data-types.md) | Кем изменен ||
|| **OPENED**
[`char`](../../data-types.md) | Доступен ли контакт для всех. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../../data-types.md) | Последняя активность ||
|| **LAST_ACTIVITY_BY**
[`user`](../../data-types.md) | Автор последней активности в таймлайне ||
|| **LAST_COMMUNICATION_TIME**
[`string`](../../data-types.md) | Дата и время последней коммуникации с контактом. Приходит строкой в формате даты Битрикс24, а не ISO 8601, например `09/23/2026 06:27:48 pm`. Если коммуникаций не было — `null` ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. Например, `CPC` — объявления, `CPM` — баннеры ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **PHONE**
[`crm_multifield[]`](../data-types.md) | Телефон ||
|| **EMAIL**
[`crm_multifield[]`](../data-types.md) | E-mail ||
|| **WEB**
[`crm_multifield[]`](../data-types.md) | Сайт ||
|| **IM**
[`crm_multifield[]`](../data-types.md) | Мессенджер ||
|| **LINK**
[`crm_multifield[]`](../data-types.md) | Ссылки. Служебное поле ||
|#

**Поля связи с внешними источниками данных**

Поля заполняются, если контакт создан внешней системой.

#|
|| **Название**
`тип` | **Описание** ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор внешней системы ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор контакта во внешней системе ||
|| **ORIGIN_VERSION**
[`string`](../../data-types.md) | Версия данных контакта во внешней системе ||
|| **PARENT_ID_...**
[`crm_entity`](../data-types.md) | Идентификатор элемента родительского смарт-процесса. Например, `PARENT_ID_153` — элемент смарт-процесса с `entityTypeId=153`. Поле приходит, если смарт-процесс связан с контактами как родительский ||
|#

**Устаревшие поля**

Поля адреса в контакте являются устаревшими и используются только в режиме совместимости. Для работы с адресом используйте [реквизиты](../requisites/index.md).

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
|| **ADDRESS_LOC_ADDR_ID**
[`integer`](../../data-types.md) | Идентификатор адреса местоположения ||
|#

Ответ может содержать пользовательские поля контакта, например `UF_CRM_1720697698689`. Их состав зависит от настроек Битрикс24. Получить описание доступных полей можно методом [crm.contact.fields](crm-contact-fields.md).

#### Элемент crm_multifield {#crm_multifield}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор значения множественного поля ||
|| **VALUE_TYPE**
[`string`](../../data-types.md) | Вид значения, например `WORK` — рабочий ||
|| **VALUE**
[`string`](../../data-types.md) | Значение: телефон, e-mail, адрес сайта или мессенджера ||
|| **TYPE_ID**
[`string`](../../data-types.md) | Тип поля: `PHONE`, `EMAIL`, `WEB`, `IM` или `LINK` ||
|#

{% note tip "Поля типа `crm_multifield`" %}

Поля `PHONE`, `EMAIL`, `WEB`, `IM` и `LINK` присутствуют в ответе, если для соответствующего типа есть значения.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `ID is not defined or invalid.` | Параметр `id` не передан или после приведения к целому числу его значение не больше 0 ||
|| `400` | Пустое значение | `Access denied.` | У пользователя нет прав на «Чтение» контакта ||
|| `400` | Пустое значение | `Not found` | Контакт с переданным `id` не найден или относится не к общему направлению ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-add.md)
- [{#T}](./crm-contact-update.md)
- [{#T}](./crm-contact-list.md)
- [{#T}](./crm-contact-delete.md)
- [{#T}](./crm-contact-fields.md)
- [{#T}](../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-activity-to-contact.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-send-email.md)
