# Отправить документ по шаблону sign.b2e.template.send

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`, `crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами создавать, просматривать и изменять документы КЭДО и правом на просмотр шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

Метод `sign.b2e.template.send` создает документ по шаблону компании и сразу отправляет его сотруднику на подписание. Один вызов — один документ и один подписант.

Метод работает в приложении и через входящий вебхук. Приложению или вебхуку нужны два scope: `sign.b2e` и `crm`. Вызвать метод внутри [batch](../rest-v3.md#batch) нельзя.

{% note warning "" %}

Повторный вызов может отправить сотруднику второй документ. Передавайте заголовок `Idempotency-Key` с ключом повтора, как во вкладках cURL: повтор с тем же ключом и тем же телом запроса вернет ответ первого вызова и второй документ не отправит. Для нового документа берите новый ключ. Подробнее — в разделе [Повторный вызов без дублей](../rest-v3.md#idempotency).

Битрикс24 запоминает по ключу только успешный ответ. После ошибки повтор с тем же ключом выполняется заново, как новый вызов.

Ответ может прийти через несколько десятков секунд: дождитесь его, прежде чем повторять вызов. Сразу повторять можно только после статуса `429`: такой вызов документ не создает. После статусов `500`, `503`, ошибки прокси или таймаута клиента сначала проверьте в Битрикс24, появился ли у сотрудника документ: такой ответ не говорит, создан документ или нет.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateUid***
[`string`](../data-types.md) | Идентификатор шаблона. Получить его можно методом [sign.b2e.template.list](./sign-b2e-template-list.md) или из состава комплекта методом [sign.b2e.template.folder.get](./sign-b2e-template-folder-get.md) ||
|| **signerUserId***
[`integer`](../data-types.md) | Идентификатор пользователя, который подписывает документ. Подписантом может быть активный сотрудник или активный пользователь экстранета, например кандидат до приема на работу.

Идентификатор можно получить методом [user.get](../user/user-get.md) ||
|| **responsibleUserId**
[`integer`](../data-types.md) | Идентификатор ответственного за документ. Ответственным может быть активный сотрудник с правом создавать документы КЭДО и правом на просмотр этого шаблона.

По умолчанию: пользователь, от имени которого вызван метод ||
|| **externalSettings**
[`object`](../data-types.md) | Номер и дата документа во внешней системе [(подробное описание)](#external-settings) ||
|#

Другие параметры метод не принимает: вызов с ними вернет ошибку валидации. Исключение — параметры авторизации приложения `auth`, `access_token`, `auth_connector` и `state`: их можно передать в теле запроса.

### Параметр externalSettings {#external-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **externalId**
[`string`](../data-types.md) | Внешний номер документа. Длина — от 1 до 255 символов ||
|| **externalDateCreate**
[`string`](../data-types.md) | Дата документа во внешней системе в формате `YYYY-MM-DDThh:mm:ss+hh:mm`, например `2026-11-12T10:00:00+03:00`. Дата и время сохраняются так, как переданы, без пересчета часового пояса ||
|#

Если номер документа в шаблоне заполняет интеграция с 1С, не передавайте `externalId`. Если дату заполняет интеграция, не передавайте `externalDateCreate`. Иначе метод вернет ошибку `SIGN_B2E_EXTERNAL_SETTINGS_FROM_INTEGRATION`.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/sign.b2e.template.send`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Idempotency-Key: 6f1d2c3b-8a4e-4b7f-9c1d-2e3f4a5b6c7d" \
    -d '{"templateUid":"e2bjlmefhz8tzy1klbdnpnfsk3np08l2","signerUserId":1595,"externalSettings":{"externalId":"HR-2026-118","externalDateCreate":"2026-11-12T10:00:00+03:00"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/sign.b2e.template.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Idempotency-Key: 6f1d2c3b-8a4e-4b7f-9c1d-2e3f4a5b6c7d" \
    -d '{"templateUid":"e2bjlmefhz8tzy1klbdnpnfsk3np08l2","signerUserId":1595,"externalSettings":{"externalId":"HR-2026-118","externalDateCreate":"2026-11-12T10:00:00+03:00"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/sign.b2e.template.send
    ```

- JS (TS)

    Методы `sign.b2e.*` REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type State = {
      code: string
      name: string
    }

    type TemplateSendResult = {
      item: {
        uid: string
        state: State
        members: Array<{
          uid: string
          role: string
          party: number
          user: {
            employeeCode: string | null
            employeeId: number | null
            userId: number | null
          }
          state: State
        }>
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateSendResult>(
        'sign.b2e.template.send',
        {
          templateUid: 'e2bjlmefhz8tzy1klbdnpnfsk3np08l2',
          signerUserId: 1595,
          externalSettings: {
            externalId: 'HR-2026-118',
            externalDateCreate: '2026-11-12T10:00:00+03:00',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Document uid:', result.item.uid, 'state:', result.item.state.code)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы `sign.b2e.*` REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function sendByTemplate() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'sign.b2e.template.send',
            {
              templateUid: 'e2bjlmefhz8tzy1klbdnpnfsk3np08l2',
              signerUserId: 1595,
              externalSettings: {
                externalId: 'HR-2026-118',
                externalDateCreate: '2026-11-12T10:00:00+03:00',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Document uid:', result.item.uid, 'state:', result.item.state.code)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendByTemplate)
    </script>
    ```

- Python

    SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`, а методов `sign.b2e.*` в нем пока нет. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "sign.b2e.template.send"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateUid": "e2bjlmefhz8tzy1klbdnpnfsk3np08l2",
                "signerUserId": 1595,
                "externalSettings": {
                    "externalId": "HR-2026-118",
                    "externalDateCreate": "2026-11-12T10:00:00+03:00",
                },
            },
            prefer_version=3,
        )
        document = response["result"]["item"]
        print(document["uid"], document["state"]["code"])
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sign.b2e.template.send',
                [
                    'templateUid' => 'e2bjlmefhz8tzy1klbdnpnfsk3np08l2',
                    'signerUserId' => 1595,
                    'externalSettings' => [
                        'externalId' => 'HR-2026-118',
                        'externalDateCreate' => '2026-11-12T10:00:00+03:00',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'sign.b2e.template.send',
        {
            templateUid: 'e2bjlmefhz8tzy1klbdnpnfsk3np08l2',
            signerUserId: 1595,
            externalSettings: {
                externalId: 'HR-2026-118',
                externalDateCreate: '2026-11-12T10:00:00+03:00',
            },
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sign.b2e.template.send',
        [
            'templateUid' => 'e2bjlmefhz8tzy1klbdnpnfsk3np08l2',
            'signerUserId' => 1595,
            'externalSettings' => [
                'externalId' => 'HR-2026-118',
                'externalDateCreate' => '2026-11-12T10:00:00+03:00',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sign.b2e.template.send", b24.Params{
    	"templateUid":  "e2bjlmefhz8tzy1klbdnpnfsk3np08l2",
    	"signerUserId": 1595,
    	"externalSettings": b24.Params{
    		"externalId":         "HR-2026-118",
    		"externalDateCreate": "2026-11-12T10:00:00+03:00",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sign.b2e.template.send: %w", err)
    }

    var result struct {
    	Item struct {
    		UID   string `json:"uid"`
    		State struct {
    			Code string `json:"code"`
    			Name string `json:"name"`
    		} `json:"state"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.UID, result.Item.State.Code)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "uid": "R-1U-GZR3-CUI1-AWAV",
            "state": {
                "code": "new",
                "name": "Новый"
            },
            "members": [
                {
                    "uid": "sasx13zpk23ldaj0js8lbo689mzq7djg",
                    "role": "assignee",
                    "party": 1,
                    "user": {
                        "employeeCode": null,
                        "employeeId": null,
                        "userId": 1295
                    },
                    "state": {
                        "code": "wait",
                        "name": "Ожидание"
                    }
                },
                {
                    "uid": "rqylyeik0eyn2am884ug2hgctqz9c5qs",
                    "role": "signer",
                    "party": 2,
                    "user": {
                        "employeeCode": null,
                        "employeeId": null,
                        "userId": 1595
                    },
                    "state": {
                        "code": "wait",
                        "name": "Ожидание"
                    }
                }
            ]
        }
    },
    "time": {
        "start": 1794480677,
        "finish": 1794480678.819885,
        "duration": 1.819885015487671,
        "processing": 1,
        "date_start": "2026-11-12T13:51:17+03:00",
        "date_finish": "2026-11-12T13:51:18+03:00",
        "operating_reset_at": 1794481260,
        "operating": 1.2076218128204346
    }
}
```

Ответ устроен так же, как у метода [sign.b2e.document.get](./sign-b2e-document-get.md): результат отправки и последующие проверки статуса можно разбирать одним кодом.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../data-types.md) | Отправленный документ [(подробное описание)](#item) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Идентификатор документа. По нему статус документа получают методом [sign.b2e.document.get](./sign-b2e-document-get.md) ||
|| **state**
[`object`](../data-types.md) | Статус документа [(подробное описание)](#state). Сразу после отправки приходит `new`, затем документ переходит в `signing` ||
|| **members**
[`array`](../data-types.md) | Участники подписания [(подробное описание)](#members).

Пустой массив приходит, если документ отправлен, но прочитать его после отправки не удалось. Тогда участников вернет метод [sign.b2e.document.get](./sign-b2e-document-get.md) по `uid` ||
|#

#### Объект state {#state}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код статуса. Проверяйте статус по коду, а не по названию.

Коды статуса документа:

- `new` — документ создан, подписание еще не началось
- `signing` — идет подписание
- `stopped` — подписание остановлено
- `done` — документ подписан

Коды статуса участника:

- `wait` — ждет своей очереди
- `ready` — подписывает документ
- `done` — подписал
- `refused` — отказался подписывать
- `stopped` — подписание остановлено ||
|| **name**
[`string`](../data-types.md) | Название статуса на языке ответа ||
|#

#### Элемент members {#members}

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Идентификатор участника ||
|| **role**
[`string`](../data-types.md) | Роль участника.

Возможные значения:

- `signer` — сотрудник, который подписывает документ
- `assignee` — представитель компании
- `reviewer` — согласующий
- `editor` — редактор ||
|| **party**
[`integer`](../data-types.md) | Номер стороны подписания, к которой относится участник ||
|| **user**
[`object`](../data-types.md) | Данные пользователя [(подробное описание)](#user) ||
|| **state**
[`object`](../data-types.md) | Статус участника. Поля — как у [статуса документа](#state) ||
|#

#### Объект user {#user}

#|
|| **Название**
`тип` | **Описание** ||
|| **employeeCode**
[`string`](../data-types.md) или `null` | Код сотрудника в системе кадрового учета. `null`, если сотрудник не связан с HCM Link — интеграцией КЭДО с системой кадрового учета ||
|| **employeeId**
[`integer`](../data-types.md) или `null` | Идентификатор сотрудника в системе кадрового учета. `null`, если сотрудник не связан с HCM Link ||
|| **userId**
[`integer`](../data-types.md) или `null` | Идентификатор пользователя Битрикс24 ||
|#

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "SIGN_B2E_TEMPLATE_NOT_FOUND",
        "message": "Шаблон не найден или недоступен для отправки. Выберите шаблон из списка доступных",
        "validation": [
            {
                "field": "templateUid",
                "code": "SIGN_B2E_TEMPLATE_NOT_FOUND"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

Если ошибка связана с параметром, массив `error.validation` называет его в поле `field` и повторяет код ошибки в поле `code`.

### Возможные коды ошибок

#### Ошибки доступа

HTTP-статус: **403**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_ACCESS_DENIED` | Недостаточно прав для этого действия в подписании с сотрудниками. Обратитесь к администратору Битрикс24 | Выдайте пользователю права создавать, просматривать и изменять документы КЭДО. Вызывать метод должен активный сотрудник: служебная учетная запись, пользователь экстранета и гость коллабы получают эту ошибку ||
|| `SIGN_REST_SCOPE_REQUIRED` | Не хватает права доступа crm. Добавьте его в настройках приложения или входящего вебхука | Добавьте scope `crm` приложению или вебхуку ||
|| `SIGN_REST_AUTH_TYPE_NOT_ALLOWED` | Метод доступен только приложениям и входящим вебхукам | Вызовите метод из приложения или через входящий вебхук ||
|| `SIGN_B2E_UNAVAILABLE` | Подписание с сотрудниками недоступно в этом Битрикс24 | Проверьте, что КЭДО доступен в вашем Битрикс24 ||
|| `SIGN_B2E_TEMPLATES_UNAVAILABLE` | Шаблоны для подписания с сотрудниками недоступны в этом Битрикс24 | Проверьте, что шаблоны КЭДО доступны в вашем Битрикс24 ||
|| `SIGN_B2E_TARIFF_RESTRICTED` | Подписание с сотрудниками недоступно на текущем тарифе | Смените тариф Битрикс24 ||
|#

#### Ошибки шаблона

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_TEMPLATE_NOT_FOUND` | Шаблон не найден или недоступен для отправки. Выберите шаблон из списка доступных | Возьмите `uid` из ответа [sign.b2e.template.list](./sign-b2e-template-list.md). Ошибка возникает и тогда, когда шаблон есть, но пользователь не может его просматривать. HTTP-статус **404** ||
|| `SIGN_B2E_TEMPLATE_COMPANY_NOT_FOUND` | Компания, связанная с шаблоном, не найдена | Укажите в шаблоне существующую компанию или выберите другой шаблон. HTTP-статус **409** ||
|| `SIGN_B2E_TEMPLATE_FILE_INVALID` | Файл шаблона недоступен. Замените его в Битрикс24 или выберите другой шаблон | Загрузите файл шаблона заново в Битрикс24. HTTP-статус **409** ||
|#

#### Ошибки участников

HTTP-статус: **400**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_SIGNER_NOT_FOUND` | Сотрудник не найден или не может подписывать документы. Укажите другого подписанта | Передайте в `signerUserId` активного сотрудника или активного пользователя экстранета ||
|| `SIGN_B2E_RESPONSIBLE_NOT_ALLOWED` | Этого сотрудника нельзя назначить ответственным. Укажите сотрудника с правом отправлять документы по этому шаблону | Передайте в `responsibleUserId` активного сотрудника с правом создавать документы КЭДО и правом на просмотр шаблона ||
|| `SIGN_B2E_MEMBER_ROLE_NOT_RESOLVED` | Для этого подписанта не найден сотрудник с ролью из шаблона. Проверьте структуру компании или укажите другого подписанта | В шаблоне участник задан ролью, например руководитель подписанта. Проверьте структуру компании или укажите другого подписанта ||
|#

#### Ошибка внешних параметров

HTTP-статус: **409**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_EXTERNAL_SETTINGS_FROM_INTEGRATION` | Это поле заполняется из 1С по настройкам шаблона. Уберите его из запроса | Уберите из `externalSettings` поле, указанное в `error.validation[].field` ||
|#

#### Ошибка пакетного вызова

HTTP-статус: **400**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_REST_BATCH_NOT_SUPPORTED` | Метод недоступен в пакетном запросе. Вызовите его отдельно | Вызовите метод отдельным запросом, не внутри `batch` ||
|#

#### Ошибка сервиса подписи

HTTP-статус: **503**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_SIGNING_SERVICE_TEMPORARY_ERROR` | Сервис подписания временно недоступен, документ не отправлен. Повторите запрос позже | Проверьте документы сотрудника в Битрикс24. Если документа нет, повторите запрос позже ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `templateUid` | Обязательное поле `templateUid` не указано | Добавьте `templateUid` в тело запроса ||
|| `templateUid` | A string is expected | Передайте идентификатор шаблона строкой ||
|| `signerUserId` | Обязательное поле `signerUserId` не указано | Добавьте `signerUserId` в тело запроса ||
|| `signerUserId`, `responsibleUserId` | An integer is expected | Передайте идентификатор числом ||
|| `responsibleUserId` | Значение поля должно быть не меньше, чем 1 | Передайте идентификатор пользователя больше `0` или не передавайте параметр ||
|| `externalSettings.externalId` | Значение поля не может быть пустым | Передайте непустой номер документа или не передавайте поле ||
|| `externalSettings.externalDateCreate` | A date in the format YYYY-MM-DDThh:mm:ss+hh:mm is expected | Передайте дату в формате `2026-11-12T10:00:00+03:00` ||
|| имя параметра | Unknown parameter | Уберите параметр, которого нет в описании ||
|#

#### Ошибки ключа повтора

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `BITRIX_REST_V3_EXCEPTION_IDEMPOTENCYKEYREUSEDEXCEPTION` | Ключ уже использовался в успешном вызове с другим телом запроса | Для нового документа возьмите новый ключ. Прежний ключ отправляйте только с тем же телом запроса. HTTP-статус **422** ||
|| `BITRIX_REST_V3_EXCEPTION_INVALIDIDEMPOTENCYKEYEXCEPTION` | Значение ключа не подходит по длине или содержит недопустимые символы | Передайте строку от 1 до 255 печатных символов ASCII. HTTP-статус **400** ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-template-list.md)
- [{#T}](./sign-b2e-template-folder-get.md)
- [{#T}](./sign-b2e-document-get.md)
- [{#T}](./events/on-sign-b2e-document-status-changed.md)
- [{#T}](./index.md)
