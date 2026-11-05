# Изменить склад catalog.store.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование складов», которому доступен склад по праву «Просмотр и выбор склада», или автор склада

Метод `catalog.store.update` изменяет склад.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_store.id`](../data-types.md#catalog_store) | Идентификатор склада.

Получить идентификаторы складов можно методом [catalog.store.list](./catalog-store-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Значения полей склада, которые нужно изменить ([подробное описание](#fields)).

Метод меняет только переданные поля, остальные сохраняют прежние значения. Пустой объект `{}` метод принимает без ошибки и обновляет только дату изменения ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **address**
[`string`](../../data-types.md) | Адрес склада. Пустая строка не принимается ||
|| **title**
[`string`](../../data-types.md) | Название склада ||
|| **active**
[`string`](../../data-types.md) | Активность склада. Возможные значения:
- `Y` — склад активен
- `N` — склад неактивен

Любое другое значение метод сохраняет как `N` ||
|| **description**
[`string`](../../data-types.md) | Описание склада ||
|| **gpsN**
[`double`](../../data-types.md) | Широта склада, например `54.71411`.

Значение, которое не является числом, метод сохраняет как `null` без ошибки — прежняя широта стирается ||
|| **gpsS**
[`double`](../../data-types.md) | Долгота склада, например `20.56675`.

Значение, которое не является числом, метод сохраняет как `null` без ошибки — прежняя долгота стирается ||
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

Любое другое значение метод сохраняет как `N` ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки склада в списках.

Значение, которое не является числом, метод сохраняет как `null` без ошибки ||
|| **code**
[`string`](../../data-types.md) | Символьный код склада ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код склада. Используйте его для связи склада с записью во внешней системе ||
|#

Поля `id`, `userId`, `modifiedBy`, `dateCreate` и `dateModify` изменить нельзя: метод пропускает их без ошибки. После изменения `modifiedBy` равно идентификатору текущего пользователя, `dateModify` — времени изменения. Неизвестные поля в `fields` метод тоже пропускает.

Изображение склада `imageId` этим методом изменить или удалить нельзя: объект в `imageId`, например `{"fileData": [...]}` или `{"remove": "Y"}`, метод отклоняет с ошибкой `Wrong format of field`, а строку пропускает без ошибки и без изменений.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":37,"fields":{"schedule":"Пн-Вс 10:00-22:00","phone":"+7 (4012) 21-28-51","issuingCenter":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.store.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":37,"fields":{"schedule":"Пн-Вс 10:00-22:00","phone":"+7 (4012) 21-28-51","issuingCenter":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.store.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type StoreUpdateResult = {
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
      const response = await $b24.actions.v2.call.make<StoreUpdateResult>({
        method: 'catalog.store.update',
        params: {
          id: 37,
          fields: {
            schedule: 'Пн-Вс 10:00-22:00',
            phone: '+7 (4012) 21-28-51',
            issuingCenter: 'N',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated store:', result.store.id, result.store.schedule)
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
      async function updateStore() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.store.update',
            params: {
              id: 37,
              fields: {
                schedule: 'Пн-Вс 10:00-22:00',
                phone: '+7 (4012) 21-28-51',
                issuingCenter: 'N',
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
          console.info('Updated store:', result.store.id, result.store.schedule)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateStore)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.store.update(
            bitrix_id=37,
            fields={
                "schedule": "Пн-Вс 10:00-22:00",
                "phone": "+7 (4012) 21-28-51",
                "issuingCenter": "N",
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
                'catalog.store.update',
                [
                    'id'     => 37,
                    'fields' => [
                        'schedule'      => 'Пн-Вс 10:00-22:00',
                        'phone'         => '+7 (4012) 21-28-51',
                        'issuingCenter' => 'N',
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
        'catalog.store.update',
        {
            id: 37,
            fields: {
                schedule: 'Пн-Вс 10:00-22:00',
                phone: '+7 (4012) 21-28-51',
                issuingCenter: 'N',
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
        'catalog.store.update',
        [
            'id' => 37,
            'fields' => [
                'schedule' => 'Пн-Вс 10:00-22:00',
                'phone' => '+7 (4012) 21-28-51',
                'issuingCenter' => 'N',
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
    res, err := client.Core().Call(ctx, "catalog.store.update", b24.Params{
    	"id": 37,
    	"fields": b24.Params{
    		"schedule":      "Пн-Вс 10:00-22:00",
    		"phone":         "+7 (4012) 21-28-51",
    		"issuingCenter": "N",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.store.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "store".
    raw, ok := b24.Unwrap(res.Result, "store")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа store")
    }

    // Необязательные поля могут прийти как null, поэтому для них указатели.
    var item struct {
    	ID            b24.ID  `json:"id"`
    	Title         *string `json:"title"`
    	Phone         *string `json:"phone"`
    	Schedule      *string `json:"schedule"`
    	IssuingCenter string  `json:"issuingCenter"`
    	ModifiedBy    int     `json:"modifiedBy"`
    	DateModify    string  `json:"dateModify"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.DateModify)
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
            "dateModify": "2026-11-05T13:20:13+03:00",
            "description": "Основной склад розничных товаров",
            "email": "store-kgd@example.com",
            "gpsN": 54.71411,
            "gpsS": 20.56675,
            "id": 37,
            "imageId": null,
            "issuingCenter": "N",
            "modifiedBy": 1269,
            "phone": "+7 (4012) 21-28-51",
            "schedule": "Пн-Вс 10:00-22:00",
            "sort": 200,
            "title": "Склад на Московском",
            "userId": 1269,
            "xmlId": "store-kgd-01"
        }
    },
    "time": {
        "start": 1793874013,
        "finish": 1793874013.076988,
        "duration": 0.07698798179626465,
        "processing": 0,
        "date_start": "2026-11-05T13:20:13+03:00",
        "date_finish": "2026-11-05T13:20:13+03:00",
        "operating_reset_at": 1793874600,
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
[`catalog_store`](../data-types.md#catalog_store) | Объект со всеми полями склада после изменения ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "201100000000",
    "error_description": "store does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300020` | Access Denied | У пользователя нет права «Редактирование складов» или склад ему недоступен ||
|| `400` | `201100000000` | store does not exist. | Склад с указанным `id` не найден ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {id}. Should be value of type int. | В `id` передано не число ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {fields}. Should be value of type array. | В `fields` передан не объект ||
|| `400` | `0` | Не указан адрес склада | В `address` передана пустая строка ||
|| `400` | `0` | Wrong format of field `imageId`. | В поле передан объект или массив вместо значения. В тексте указано имя поля, например для `title` — Wrong format of field `title`. ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-add.md)
- [{#T}](./catalog-store-get.md)
- [{#T}](./catalog-store-list.md)
- [{#T}](./catalog-store-delete.md)
- [{#T}](./catalog-store-get-fields.md)
