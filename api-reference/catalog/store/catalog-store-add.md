# Добавить склад catalog.store.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование складов»

Метод `catalog.store.add` создает склад.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания склада ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **address***
[`string`](../../data-types.md) | Адрес склада. Пустая строка не принимается ||
|| **title**
[`string`](../../data-types.md) | Название склада.

Если не передано, склад создается без названия, в ответе `title` равно `null` ||
|| **active**
[`string`](../../data-types.md) | Активность склада. Возможные значения:
- `Y` — склад активен
- `N` — склад неактивен

Любое другое значение метод сохраняет как `N`.

По умолчанию `Y` ||
|| **description**
[`string`](../../data-types.md) | Описание склада ||
|| **gpsN**
[`double`](../../data-types.md) | Широта склада, например `54.71411`. Можно передать числом или строкой с числом ||
|| **gpsS**
[`double`](../../data-types.md) | Долгота склада, например `20.56675`. Можно передать числом или строкой с числом ||
|| **phone**
[`string`](../../data-types.md) | Телефон склада ||
|| **schedule**
[`string`](../../data-types.md) | График работы склада, например `Пн-Пт 9:00-20:00` ||
|| **email**
[`string`](../../data-types.md) | E-mail склада. Формат адреса метод не проверяет ||
|| **issuingCenter**
[`string`](../../data-types.md) | Является ли склад пунктом выдачи. Возможные значения:
- `Y` — да
- `N` — нет

Любое другое значение метод сохраняет как `N`.

По умолчанию `N` ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки склада в списках.

Значение, которое не является числом, метод сохраняет как `null` без ошибки.

По умолчанию `100` ||
|| **code**
[`string`](../../data-types.md) | Символьный код склада. Уникальность кода метод не проверяет ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код склада. Используйте его для связи склада с записью во внешней системе ||
|#

Поля `id`, `userId`, `modifiedBy`, `dateCreate` и `dateModify` метод заполняет сам: `userId` и `modifiedBy` — идентификатор текущего пользователя, даты — время создания. Переданные значения этих полей метод пропускает без ошибки. Неизвестные поля в `fields` метод тоже пропускает.

Изображение склада `imageId` этим методом задать нельзя: объект в `imageId`, например `{"fileData": [...]}`, метод отклоняет с ошибкой `Wrong format of field`, а строку пропускает без ошибки и без сохранения.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"address":"Калининград, Московский проспект, 52","title":"Склад на Московском","active":"Y","description":"Основной склад розничных товаров","gpsN":54.71411,"gpsS":20.56675,"phone":"+7 (4012) 21-28-50","schedule":"Пн-Пт 9:00-20:00, Сб-Вс 11:00-18:00","email":"store-kgd@example.com","issuingCenter":"Y","sort":200,"code":"store_kgd","xmlId":"store-kgd-01"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.store.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"address":"Калининград, Московский проспект, 52","title":"Склад на Московском","active":"Y","description":"Основной склад розничных товаров","gpsN":54.71411,"gpsS":20.56675,"phone":"+7 (4012) 21-28-50","schedule":"Пн-Пт 9:00-20:00, Сб-Вс 11:00-18:00","email":"store-kgd@example.com","issuingCenter":"Y","sort":200,"code":"store_kgd","xmlId":"store-kgd-01"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.store.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type StoreAddResult = {
      store: {
        active: string
        address: string
        code: string | null
        dateCreate: ISODate
        dateModify: ISODate
        description: string | null
        email: string | null
        gpsN: number | null
        gpsS: number | null
        id: number
        imageId: { id: number; url: string } | null
        issuingCenter: string
        modifiedBy: number
        phone: string | null
        schedule: string | null
        sort: number | null
        title: string | null
        userId: number
        xmlId: string | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<StoreAddResult>({
        method: 'catalog.store.add',
        params: {
          fields: {
            address: 'Калининград, Московский проспект, 52',
            title: 'Склад на Московском',
            active: 'Y',
            description: 'Основной склад розничных товаров',
            gpsN: 54.71411,
            gpsS: 20.56675,
            phone: '+7 (4012) 21-28-50',
            schedule: 'Пн-Пт 9:00-20:00, Сб-Вс 11:00-18:00',
            email: 'store-kgd@example.com',
            issuingCenter: 'Y',
            sort: 200,
            code: 'store_kgd',
            xmlId: 'store-kgd-01',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added store:', result.store.id, result.store.title)
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
      async function addStore() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.store.add',
            params: {
              fields: {
                address: 'Калининград, Московский проспект, 52',
                title: 'Склад на Московском',
                active: 'Y',
                description: 'Основной склад розничных товаров',
                gpsN: 54.71411,
                gpsS: 20.56675,
                phone: '+7 (4012) 21-28-50',
                schedule: 'Пн-Пт 9:00-20:00, Сб-Вс 11:00-18:00',
                email: 'store-kgd@example.com',
                issuingCenter: 'Y',
                sort: 200,
                code: 'store_kgd',
                xmlId: 'store-kgd-01',
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
          console.info('Added store:', result.store.id, result.store.title)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addStore)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.store.add(
            fields={
                "address": "Калининград, Московский проспект, 52",
                "title": "Склад на Московском",
                "active": "Y",
                "description": "Основной склад розничных товаров",
                "gpsN": 54.71411,
                "gpsS": 20.56675,
                "phone": "+7 (4012) 21-28-50",
                "schedule": "Пн-Пт 9:00-20:00, Сб-Вс 11:00-18:00",
                "email": "store-kgd@example.com",
                "issuingCenter": "Y",
                "sort": 200,
                "code": "store_kgd",
                "xmlId": "store-kgd-01",
            },
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
                'catalog.store.add',
                [
                    'fields' => [
                        'address'       => 'Калининград, Московский проспект, 52',
                        'title'         => 'Склад на Московском',
                        'active'        => 'Y',
                        'description'   => 'Основной склад розничных товаров',
                        'gpsN'          => 54.71411,
                        'gpsS'          => 20.56675,
                        'phone'         => '+7 (4012) 21-28-50',
                        'schedule'      => 'Пн-Пт 9:00-20:00, Сб-Вс 11:00-18:00',
                        'email'         => 'store-kgd@example.com',
                        'issuingCenter' => 'Y',
                        'sort'          => 200,
                        'code'          => 'store_kgd',
                        'xmlId'         => 'store-kgd-01',
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

    ```js
    BX24.callMethod(
        'catalog.store.add',
        {
            fields: {
                address: 'Калининград, Московский проспект, 52',
                title: 'Склад на Московском',
                active: 'Y',
                description: 'Основной склад розничных товаров',
                gpsN: 54.71411,
                gpsS: 20.56675,
                phone: '+7 (4012) 21-28-50',
                schedule: 'Пн-Пт 9:00-20:00, Сб-Вс 11:00-18:00',
                email: 'store-kgd@example.com',
                issuingCenter: 'Y',
                sort: 200,
                code: 'store_kgd',
                xmlId: 'store-kgd-01',
            },
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.store.add',
        [
            'fields' => [
                'address' => 'Калининград, Московский проспект, 52',
                'title' => 'Склад на Московском',
                'active' => 'Y',
                'description' => 'Основной склад розничных товаров',
                'gpsN' => 54.71411,
                'gpsS' => 20.56675,
                'phone' => '+7 (4012) 21-28-50',
                'schedule' => 'Пн-Пт 9:00-20:00, Сб-Вс 11:00-18:00',
                'email' => 'store-kgd@example.com',
                'issuingCenter' => 'Y',
                'sort' => 200,
                'code' => 'store_kgd',
                'xmlId' => 'store-kgd-01',
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
    res, err := client.Core().Call(ctx, "catalog.store.add", b24.Params{
    	"fields": b24.Params{
    		"address":       "Калининград, Московский проспект, 52",
    		"title":         "Склад на Московском",
    		"active":        "Y",
    		"description":   "Основной склад розничных товаров",
    		"gpsN":          54.71411,
    		"gpsS":          20.56675,
    		"phone":         "+7 (4012) 21-28-50",
    		"schedule":      "Пн-Пт 9:00-20:00, Сб-Вс 11:00-18:00",
    		"email":         "store-kgd@example.com",
    		"issuingCenter": "Y",
    		"sort":          200,
    		"code":          "store_kgd",
    		"xmlId":         "store-kgd-01",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.store.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "store".
    raw, ok := b24.Unwrap(res.Result, "store")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа store")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    var item struct {
    	ID            b24.ID   `json:"id"`
    	Title         *string  `json:"title"`
    	Address       string   `json:"address"`
    	Active        string   `json:"active"`
    	IssuingCenter string   `json:"issuingCenter"`
    	GpsN          *float64 `json:"gpsN"`
    	GpsS          *float64 `json:"gpsS"`
    	Sort          *int     `json:"sort"`
    	Code          *string  `json:"code"`
    	XMLID         *string  `json:"xmlId"`
    	UserID        int      `json:"userId"`
    	DateCreate    string   `json:"dateCreate"`
    	ImageID       *struct {
    		ID  int    `json:"id"`
    		URL string `json:"url"`
    	} `json:"imageId"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Address)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "store": {
            "active": "Y",
            "address": "Калининград, Московский проспект, 52",
            "code": "store_kgd",
            "dateCreate": "2026-11-05T13:19:57+03:00",
            "dateModify": "2026-11-05T13:19:57+03:00",
            "description": "Основной склад розничных товаров",
            "email": "store-kgd@example.com",
            "gpsN": 54.71411,
            "gpsS": 20.56675,
            "id": 37,
            "imageId": null,
            "issuingCenter": "Y",
            "modifiedBy": 1269,
            "phone": "+7 (4012) 21-28-50",
            "schedule": "Пн-Пт 9:00-20:00, Сб-Вс 11:00-18:00",
            "sort": 200,
            "title": "Склад на Московском",
            "userId": 1269,
            "xmlId": "store-kgd-01"
        }
    },
    "time": {
        "start": 1793873997,
        "finish": 1793873997.178257,
        "duration": 0.17825698852539062,
        "processing": 0,
        "date_start": "2026-11-05T13:19:57+03:00",
        "date_finish": "2026-11-05T13:19:57+03:00",
        "operating_reset_at": 1793874540,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.store**
[`catalog_store`](../data-types.md#catalog_store) | Объект с полями созданного склада. Метод возвращает все поля склада, включая пустые со значением `null` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required fields: address"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300020` | Access Denied | У пользователя нет права «Редактирование складов» ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `0` | Required fields: address | В `fields` нет поля `address`, в том числе если `fields` пустой ||
|| `400` | `0` | Не указан адрес склада | В `address` передана пустая строка ||
|| `400` | `0` | Wrong format of field `imageId`. | В поле передан объект или массив вместо значения. В тексте указано имя поля, например для `title` — Wrong format of field `title`. ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-update.md)
- [{#T}](./catalog-store-get.md)
- [{#T}](./catalog-store-list.md)
- [{#T}](./catalog-store-delete.md)
- [{#T}](./catalog-store-get-fields.md)
