# Установить набор компаний, связанных с указанным контактом crm.contact.company.items.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» контакта и правом «Чтение» компаний

Метод `crm.contact.company.items.set` устанавливает набор компаний, связанных с указанным контактом.

Он заменяет набор целиком: компании, которых нет в `items`, отвязываются от контакта. Чтобы добавить или убрать одну компанию и не трогать остальные, используйте [crm.contact.company.add](./crm-contact-company-add.md) и [crm.contact.company.delete](./crm-contact-company-delete.md). Как устроен объект привязки, описано в [обзоре раздела](./index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор контакта. Должен быть больше `0`.

Идентификатор можно получить с помощью метода [crm.item.list](../../universal/crm-item-list.md) по `entityTypeId = 3`
||
|| **items***
[`object[]`](../../../data-types.md) | Набор объектов, которые описывают компании контакта. Структуру объекта привязки смотрите [ниже](#contact_company_binding).

Пустой массив отвязывает от контакта все компании.

Элементы без `COMPANY_ID` или со значением меньше либо равным `0` метод пропускает без ошибки ||
|#

### Параметр items {#contact_company_binding}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMPANY_ID***
[`crm_entity`](../../data-types.md) | Идентификатор компании, которую нужно привязать к контакту.

Идентификатор можно получить с помощью метода [crm.item.list](../../universal/crm-item-list.md) по `entityTypeId = 4`.

Метод отдельно не проверяет, существует ли компания, поэтому может создать привязку к несуществующей компании ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md#standart-types) | Сделать ли компанию основной для контакта. Возможные значения:
- `Y` — да
- `N` — нет

Основной станет первая компания в `items` с `IS_PRIMARY = Y`, а если такой нет — первая компания в `items`. У остальных флаг сбрасывается в `N`.

Основная компания попадает в поле контакта `COMPANY_ID`
||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки.

Если `SORT` не передан или меньше либо равен `0`, метод вычисляет его по позиции компании в `items` как `(n + 1) * 10`, где `n` — порядковый номер компании в `items`, отсчет начинается с нуля. Первая компания получает `10`, вторая — `20` и так далее ||
|#

{% note warning "" %}

Правило действует и для уже привязанных компаний: если не передать `SORT`, метод перезапишет их прежний индекс сортировки. Чтобы сохранить порядок, получите набор методом [crm.contact.company.items.get](./crm-contact-company-items-get.md) и передайте `SORT` каждой компании.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Установить у контакта с `id = 82` следующие привязанные компании:
- компания с `id = 8`, сделать ее основной и установить `SORT = 100`
- компания с `id = 9`, установить `SORT = 200`
- компания с `id = 10`, установить `SORT = 400`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":82,"items":[{"COMPANY_ID":8,"IS_PRIMARY":"Y","SORT":100},{"COMPANY_ID":9,"SORT":200},{"COMPANY_ID":10,"SORT":400}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.company.items.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":82,"items":[{"COMPANY_ID":8,"IS_PRIMARY":"Y","SORT":100},{"COMPANY_ID":9,"SORT":200},{"COMPANY_ID":10,"SORT":400}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.company.items.set
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'crm.contact.company.items.set',
        params: {
          id: 82,
          items: [
            {
              COMPANY_ID: 8,
              IS_PRIMARY: 'Y',
              SORT: 100,
            },
            {
              COMPANY_ID: 9,
              SORT: 200,
            },
            {
              COMPANY_ID: 10,
              SORT: 400,
            },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contact companies set:', result)
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
      async function setContactCompanyItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.contact.company.items.set',
            params: {
              id: 82,
              items: [
                {
                  COMPANY_ID: 8,
                  IS_PRIMARY: 'Y',
                  SORT: 100,
                },
                {
                  COMPANY_ID: 9,
                  SORT: 200,
                },
                {
                  COMPANY_ID: 10,
                  SORT: 400,
                },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Contact companies set:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setContactCompanyItems)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.contact.company.items.set(
            bitrix_id=82,
            items=[
                {
                    "COMPANY_ID": 8,
                    "IS_PRIMARY": "Y",
                    "SORT": 100,
                },
                {
                    "COMPANY_ID": 9,
                    "SORT": 200,
                },
                {
                    "COMPANY_ID": 10,
                    "SORT": 400,
                },
            ],
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.contact.company.items.set',
                [
                    'id'    => 82,
                    'items' => [
                        [
                            'COMPANY_ID' => 8,
                            'IS_PRIMARY' => 'Y',
                            'SORT'       => 100,
                        ],
                        [
                            'COMPANY_ID' => 9,
                            'SORT'       => 200,
                        ],
                        [
                            'COMPANY_ID' => 10,
                            'SORT'       => 400,
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result[0], true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting company items for contact: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.company.items.set',
        {
            id: 82,
            items: [
                {
                    COMPANY_ID: 8,
                    IS_PRIMARY: "Y",
                    SORT: 100,
                },
                {
                    COMPANY_ID: 9,
                    SORT: 200,
                },
                {
                    COMPANY_ID: 10,
                    SORT: 400,
                }
            ],
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
        'crm.contact.company.items.set',
        [
            'id' => 82,
            'items' => [
                [
                    'COMPANY_ID' => 8,
                    'IS_PRIMARY' => 'Y',
                    'SORT' => 100,
                ],
                [
                    'COMPANY_ID' => 9,
                    'SORT' => 200,
                ],
                [
                    'COMPANY_ID' => 10,
                    'SORT' => 400,
                ]
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
    res, err := client.Core().Call(ctx, "crm.contact.company.items.set", b24.Params{
    	"id": 82,
    	"items": []b24.Params{
    		{
    			"COMPANY_ID": 8,
    			"IS_PRIMARY": "Y",
    			"SORT":       100,
    		},
    		{
    			"COMPANY_ID": 9,
    			"SORT":       200,
    		},
    		{
    			"COMPANY_ID": 10,
    			"SORT":       400,
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.contact.company.items.set: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1724139480.073569,
        "finish": 1724139481.016709,
        "duration": 0.9431400299072266,
        "processing": 0.4230809211730957,
        "date_start": "2024-08-20T09:38:00+02:00",
        "date_finish": "2024-08-20T09:38:01+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Содержит `true` в случае успеха.

Метод возвращает `true` и в том случае, когда переданный набор совпадает с текущим ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The parameter items must be array."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | The parameter ownerEntityID is invalid or not defined. | Параметр `id` не передан или меньше либо равен `0` ||
|| `400` | Пустое значение | The parameter items must be array. | Параметр `items` не передан или передан не массивом ||
|| `400` | Пустое значение | Access denied. | У пользователя нет права на чтение объектов CRM, в том числе в цифровых рабочих местах ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет права на изменение контакта ||
|| `400` | Пустое значение | Not found. | Контакт с переданным `id` не найден ||
|| `400` | Пустое значение | [Компания #1] У Вас нет прав на просмотр этого элемента | У пользователя нет права на чтение компаний. Метод проверяет это право, только если вызов что-то меняет в привязках ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-contact-company-add.md)
- [{#T}](./crm-contact-company-delete.md)
- [{#T}](./crm-contact-company-fields.md)
- [{#T}](./crm-contact-company-items-get.md)
- [{#T}](./crm-contact-company-items-delete.md)
