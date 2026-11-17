# Добавить склад v 3.0 catalog.store.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование складов»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.store.add` создает склад и возвращает его данные. Вместе со складом можно загрузить его изображение. В методе предыдущей версии такой возможности нет.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового склада. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **address***
[`string`](../../data-types.md) | Адрес склада. Пустая строка не принимается ||
|| **title**
[`string`](../../data-types.md) | Название склада ||
|| **active**
[`boolean`](../../data-types.md) | Активность склада.

Возможные значения:

- `true` — склад активен
- `false` — склад неактивен

Значения `Y`, `N` и `null` не принимаются.

По умолчанию: `true` ||
|| **description**
[`string`](../../data-types.md) | Описание склада ||
|| **gpsN**
[`double`](../../data-types.md) | Широта склада, например `54.71411`. Передайте число: строка вызовет ошибку ||
|| **gpsS**
[`double`](../../data-types.md) | Долгота склада, например `20.56675`. Передайте число: строка вызовет ошибку ||
|| **image**
[`object`](../../data-types.md) | Изображение склада. [Описание объекта](#image) ||
|| **phone**
[`string`](../../data-types.md) | Телефон склада ||
|| **schedule**
[`string`](../../data-types.md) | График работы склада, например `Пн–Пт 9:00–18:00` ||
|| **email**
[`string`](../../data-types.md) | E-mail склада. Формат адреса метод не проверяет ||
|| **issuingCenter**
[`boolean`](../../data-types.md) | Признак пункта выдачи.

Возможные значения:

- `true` — склад работает как пункт выдачи
- `false` — обычный склад

Значения `Y`, `N` и `null` не принимаются.

По умолчанию: `false` ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки склада в списках.

По умолчанию: `100` ||
|| **code**
[`string`](../../data-types.md) | Символьный код склада. Уникальность кода метод не проверяет ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код склада. Используйте его для связи склада с записью во внешней системе ||
|#

Поля `id`, `imageId`, `imageUrl`, `userId`, `modifiedBy`, `dateCreate` и `dateModify` метод заполняет сам. Если передать их в `fields`, метод вернет ошибку.

Методы REST 3.0 не поддерживают пользовательские поля склада.

### Объект image {#image}

#|
|| **Название**
`тип` | **Описание** ||
|| **upload***
[`object`](../../data-types.md) | Данные загружаемого файла. [Описание объекта](#upload) ||
|#

### Объект image.upload {#upload}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Имя файла с расширением, например `store.png`. Загрузить можно только изображение: тип файла метод определяет по расширению ||
|| **data**
[`string`](../../data-types.md) | Содержимое файла в формате Base64.

Передайте `data` или `url`, но не оба параметра сразу ||
|| **url**
[`string`](../../data-types.md) | Публичная ссылка на файл. Битрикс24 скачает файл по ссылке.

Передайте `data` или `url`, но не оба параметра сразу ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.store.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Склад на Московском","address":"Калининград, Московский проспект, 51","description":"Склад для самовывоза","phone":"+7 4012 00-00-00","email":"store@example.com","schedule":"Пн–Пт 9:00–18:00","gpsN":54.71411,"gpsS":20.56675,"sort":200,"xmlId":"store-moscow-51","code":"moscow_51","issuingCenter":true,"image":{"upload":{"name":"store.png","data":"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg=="}}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.store.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Склад на Московском","address":"Калининград, Московский проспект, 51","description":"Склад для самовывоза","phone":"+7 4012 00-00-00","email":"store@example.com","schedule":"Пн–Пт 9:00–18:00","gpsN":54.71411,"gpsS":20.56675,"sort":200,"xmlId":"store-moscow-51","code":"moscow_51","issuingCenter":true,"image":{"upload":{"name":"store.png","data":"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg=="}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.store.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StoreAddResult = {
      item: {
        id: number
        title: string
        active: boolean
        address: string
        description: string
        gpsN: number | null
        gpsS: number | null
        imageId: number
        imageUrl: string
        dateModify: string
        dateCreate: string | null
        userId: number
        modifiedBy: number
        phone: string
        schedule: string
        xmlId: string
        sort: number
        email: string
        issuingCenter: boolean
        code: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<StoreAddResult>({
        method: 'catalog.store.add',
        params: {
          fields: {
            title: 'Склад на Московском',
            address: 'Калининград, Московский проспект, 51',
            description: 'Склад для самовывоза',
            phone: '+7 4012 00-00-00',
            email: 'store@example.com',
            schedule: 'Пн–Пт 9:00–18:00',
            gpsN: 54.71411,
            gpsS: 20.56675,
            sort: 200,
            xmlId: 'store-moscow-51',
            code: 'moscow_51',
            issuingCenter: true,
            image: {
              upload: {
                name: 'store.png',
                data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==',
              },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Store created:', result.item.id)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addStore() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.store.add',
            params: {
              fields: {
                title: 'Склад на Московском',
                address: 'Калининград, Московский проспект, 51',
                description: 'Склад для самовывоза',
                phone: '+7 4012 00-00-00',
                email: 'store@example.com',
                schedule: 'Пн–Пт 9:00–18:00',
                gpsN: 54.71411,
                gpsS: 20.56675,
                sort: 200,
                xmlId: 'store-moscow-51',
                code: 'moscow_51',
                issuingCenter: true,
                image: {
                  upload: {
                    name: 'store.png',
                    data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==',
                  },
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Store created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addStore)
    </script>
    ```

- Python

    У методов `catalog.store.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.store.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "title": "Склад на Московском",
                    "address": "Калининград, Московский проспект, 51",
                    "description": "Склад для самовывоза",
                    "phone": "+7 4012 00-00-00",
                    "email": "store@example.com",
                    "schedule": "Пн–Пт 9:00–18:00",
                    "gpsN": 54.71411,
                    "gpsS": 20.56675,
                    "sort": 200,
                    "xmlId": "store-moscow-51",
                    "code": "moscow_51",
                    "issuingCenter": True,
                    "image": {
                        "upload": {
                            "name": "store.png",
                            "data": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==",
                        },
                    },
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
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
                'catalog.store.add',
                [
                    'fields' => [
                        'title' => 'Склад на Московском',
                        'address' => 'Калининград, Московский проспект, 51',
                        'description' => 'Склад для самовывоза',
                        'phone' => '+7 4012 00-00-00',
                        'email' => 'store@example.com',
                        'schedule' => 'Пн–Пт 9:00–18:00',
                        'gpsN' => 54.71411,
                        'gpsS' => 20.56675,
                        'sort' => 200,
                        'xmlId' => 'store-moscow-51',
                        'code' => 'moscow_51',
                        'issuingCenter' => true,
                        'image' => [
                            'upload' => [
                                'name' => 'store.png',
                                'data' => 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==',
                            ],
                        ],
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
        'catalog.store.add',
        {
            fields: {
                title: 'Склад на Московском',
                address: 'Калининград, Московский проспект, 51',
                description: 'Склад для самовывоза',
                phone: '+7 4012 00-00-00',
                email: 'store@example.com',
                schedule: 'Пн–Пт 9:00–18:00',
                gpsN: 54.71411,
                gpsS: 20.56675,
                sort: 200,
                xmlId: 'store-moscow-51',
                code: 'moscow_51',
                issuingCenter: true,
                image: {
                    upload: {
                        name: 'store.png',
                        data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==',
                    },
                },
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
        'catalog.store.add',
        [
            'fields' => [
                'title' => 'Склад на Московском',
                'address' => 'Калининград, Московский проспект, 51',
                'description' => 'Склад для самовывоза',
                'phone' => '+7 4012 00-00-00',
                'email' => 'store@example.com',
                'schedule' => 'Пн–Пт 9:00–18:00',
                'gpsN' => 54.71411,
                'gpsS' => 20.56675,
                'sort' => 200,
                'xmlId' => 'store-moscow-51',
                'code' => 'moscow_51',
                'issuingCenter' => true,
                'image' => [
                    'upload' => [
                        'name' => 'store.png',
                        'data' => 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==',
                    ],
                ],
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
    res, err := client.Core().Call(ctx, "catalog.store.add", b24.Params{
    	"fields": b24.Params{
    		"title":         "Склад на Московском",
    		"address":       "Калининград, Московский проспект, 51",
    		"description":   "Склад для самовывоза",
    		"phone":         "+7 4012 00-00-00",
    		"email":         "store@example.com",
    		"schedule":      "Пн–Пт 9:00–18:00",
    		"gpsN":          54.71411,
    		"gpsS":          20.56675,
    		"sort":          200,
    		"xmlId":         "store-moscow-51",
    		"code":          "moscow_51",
    		"issuingCenter": true,
    		"image": b24.Params{
    			"upload": b24.Params{
    				"name": "store.png",
    				"data": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.store.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID            int    `json:"id"`
    	Title         string `json:"title"`
    	Active        bool   `json:"active"`
    	Address       string `json:"address"`
    	IssuingCenter bool   `json:"issuingCenter"`
    	ImageURL      string `json:"imageUrl"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Title, item.Address)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 51,
            "title": "Склад на Московском",
            "active": true,
            "address": "Калининград, Московский проспект, 51",
            "description": "Склад для самовывоза",
            "gpsN": 54.71411,
            "gpsS": 20.56675,
            "imageId": 40757,
            "imageUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/fee/fee4295e698466f04b617988b6f415ff/508cb2bfea465e513a642ec8849f1023.png",
            "dateModify": "2026-11-17T16:37:04+03:00",
            "dateCreate": "2026-11-17T16:37:04+03:00",
            "userId": 1295,
            "modifiedBy": 1295,
            "phone": "+7 4012 00-00-00",
            "schedule": "Пн–Пт 9:00–18:00",
            "xmlId": "store-moscow-51",
            "sort": 200,
            "email": "store@example.com",
            "issuingCenter": true,
            "code": "moscow_51"
        }
    },
    "time": {
        "start": 1794922623,
        "finish": 1794922624.198856,
        "duration": 1.1988561153411865,
        "processing": 1,
        "date_start": "2026-11-17T16:37:03+03:00",
        "date_finish": "2026-11-17T16:37:04+03:00",
        "operating_reset_at": 1794922800,
        "operating": 0.5085549354553223
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../data-types.md) | Созданный склад. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор склада ||
|| **title**
[`string`](../../data-types.md) | Название склада. Пустая строка, если название не задано ||
|| **active**
[`boolean`](../../data-types.md) | Активность склада: `true` — склад активен, `false` — неактивен ||
|| **address**
[`string`](../../data-types.md) | Адрес склада ||
|| **description**
[`string`](../../data-types.md) | Описание склада. Пустая строка, если описание не задано ||
|| **gpsN**
[`double`](../../data-types.md) | Широта склада. Если координата не задана, приходит `0`. Если в Битрикс24 сохранено значение, которое не является числом, например пустая строка, приходит `null` ||
|| **gpsS**
[`double`](../../data-types.md) | Долгота склада. Если координата не задана, приходит `0`. Если в Битрикс24 сохранено значение, которое не является числом, например пустая строка, приходит `null` ||
|| **imageId**
[`integer`](../../data-types.md) | Идентификатор файла изображения склада. `0`, если изображения нет ||
|| **imageUrl**
[`string`](../../data-types.md) | Ссылка на изображение склада. Пустая строка, если изображения нет ||
|| **dateModify**
[`datetime`](../../data-types.md) | Дата последнего изменения склада ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания склада. У складов, которые Битрикс24 создал сам, может быть `null` ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал склад. `0` у складов, которые Битрикс24 создал сам ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил склад ||
|| **phone**
[`string`](../../data-types.md) | Телефон склада. Пустая строка, если телефон не задан ||
|| **schedule**
[`string`](../../data-types.md) | График работы склада. Пустая строка, если график не задан ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код склада. Пустая строка, если код не задан ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки склада в списках ||
|| **email**
[`string`](../../data-types.md) | E-mail склада. Пустая строка, если адрес не задан ||
|| **issuingCenter**
[`boolean`](../../data-types.md) | Признак пункта выдачи: `true` — склад работает как пункт выдачи, `false` — обычный склад ||
|| **code**
[`string`](../../data-types.md) | Символьный код склада. Пустая строка, если код не задан ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Не заполнено обязательное поле \"address\"",
                "field": "address"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` с полем `address` ||
|| `-` | Не указан адрес склада | Передайте в `address` непустую строку ||
|| `active`, `issuingCenter` | В поле `#FIELD#` требуется тип данных `bool` для такого запроса | Передайте `true` или `false`, а не `Y`, `N` или `null` ||
|| `gpsN`, `gpsS` | В поле `#FIELD#` требуется тип данных `float` для такого запроса | Передайте координату числом ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте порядок сортировки целым числом ||
|#

#### Ошибки валидации полей

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `address` | Не заполнено обязательное поле "address" | Добавьте `address` в `fields` ||
|| `id`, `imageId`, `imageUrl`, `userId`, `modifiedBy`, `dateCreate`, `dateModify` | Поле "#FIELD#" не доступно к заполнению | Уберите поле из `fields`: значение заполняется автоматически. Изображение передайте в поле `image` ||
|| `image.upload` | Не заполнено обязательное поле "upload" | Передайте файл в объекте `image.upload` ||
|| `image.upload` | Должно быть передано только одно из значений: data, url | Передайте в `image.upload` либо `data`, либо `url` ||
|#

#### Ошибки файла

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_INVALIDFILEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `FILE_TYPE_NOT_ALLOWED` | Файл неверного типа. | Загрузите изображение и укажите в `name` расширение изображения, например `store.png` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `#FIELD#` для сущности `StoreDto` | Передайте в `fields` только поля из [таблицы параметра fields](#fields). Пользовательские поля `UF_*` метод не принимает ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права «Редактирование складов» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-update-rest-v3.md)
- [{#T}](./catalog-store-get-rest-v3.md)
- [{#T}](./catalog-store-list-rest-v3.md)
- [{#T}](./catalog-store-delete-rest-v3.md)
- [{#T}](./catalog-store-field-list.md)
