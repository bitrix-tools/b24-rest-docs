# Получить адрес специальной страницы сайта landing.syspage.getSpecialPage

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтение» сайта

Метод `landing.syspage.getSpecialPage` возвращает URL специальной страницы сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **siteId***
[`integer`](../../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md) ||
|| **type***
[`string`](../../../data-types.md) | Код специальной страницы, который метод ищет в привязках сайта. 

Метод ищет точное совпадение по строке, без обрезки пробелов и без нормализации регистра.

Возможные значения:
- `mainpage` — главная страница
- `catalog` — главная страница каталога
- `personal` — персональный раздел
- `cart` — корзина
- `order` — оформление заказа
- `payment` — страница оплаты
- `compare` — страница сравнения
- `feedback` — страница обратной связи

Метод [landing.syspage.set](./landing-syspage-set.md) при сохранении убирает пробелы по краям значения `type`. Поэтому в `landing.syspage.getSpecialPage` параметр `type` нужно передавать без лишних пробелов. Иначе метод может не найти нужную страницу. 

Если вместо строки передать число, `true`, `false` или `null`, метод вернет пустую строку `""`. Если передать массив, запрос завершится ошибкой ||
|| **additional**
[`object`](../../../data-types.md) | Дополнительные параметры URL [(подробное описание)](#additional).

Каждая пара ключ-значение добавляется к итоговому URL найденной страницы. По умолчанию — пустой объект ||
|#

### Параметр additional {#additional}

Параметр `additional` добавляет к адресу найденной страницы дополнительные параметры. Он не влияет на то, какую страницу вернет метод: страница все равно определяется только по `siteId` и `type`.

Передавайте `additional` как объект в формате `{"<имя_параметра>": "<значение>"}`. Все переданные параметры будут добавлены в адресс найденной страницы. Если страница не найдена, параметр не применяется. Если в URL уже есть параметр с таким именем, его значение будет заменено.

Пример:

```json
{
    "siteId": 1390,
    "type": "personal",
    "additional": {
        "SECTION": "private",
        "utm_source": "newsletter"
    }
}
```

Результат:

```text
https://b24-test.bitrix24.shop/personalnyyrazdel/?SECTION=private&utm_source=newsletter
```

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 1390,
        "type": "personal",
        "additional": {
          "SECTION": "private"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.syspage.getSpecialPage.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 1390,
        "type": "personal",
        "additional": {
          "SECTION": "private"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.syspage.getSpecialPage.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.syspage.getSpecialPage',
    		{
    			siteId: 1390,
    			type: 'personal',
    			additional: {
    				SECTION: 'private'
    			}
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.syspage.getSpecialPage',
                [
                    'siteId' => 1390,
                    'type' => 'personal',
                    'additional' => [
                        'SECTION' => 'private',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting special page URL: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.syspage.getSpecialPage',
        {
            siteId: 1390,
            type: 'personal',
            additional: {
                SECTION: 'private'
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.syspage.getSpecialPage',
        [
            'siteId' => 1390,
            'type' => 'personal',
            'additional' => [
                'SECTION' => 'private',
            ],
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": "https://btest.bitrix24.shop/personalnyyrazdel/?SECTION=private",
    "time": {
        "start": 1774359422,
        "finish": 1774359422.588757,
        "duration": 0.5887570381164551,
        "processing": 0,
        "date_start": "2026-03-24T16:37:02+03:00",
        "date_finish": "2026-03-24T16:37:02+03:00",
        "operating_reset_at": 1774360022,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../../../data-types.md) \| `null` | URL специальной страницы.

Если передан `additional` и страница найдена, параметры будут добавлены в строку запроса.

Метод не проверяет, активна ли страница и не помечена ли она как удаленная. Возвращает `null`, если сайт не найден или у пользователя нет права «чтение» сайта `siteId`. 

Пустая строка `""` возвращается в двух случаях:
- если для переданного `type` не найдена привязка,
- если `type` передан не строкой и не массивом ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: type"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `siteId`, `type` или оба параметра ||
|| `ACCESS_DENIED` | Доступ к вызову метода запрещен: недостаточно прав для работы с разделом Сайты и магазины ||
|| `ERROR_ARGUMENT` | Передан неверный тип данных в параметре `siteId`, `type` или `additional` ||
|| `SYSTEM_ERROR` | Во время выполнения метода возникла внутренняя ошибка ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-syspage-set.md)
- [{#T}](./landing-syspage-get.md)
- [{#T}](./landing-syspage-delete-for-landing.md)
- [{#T}](./landing-syspage-delete-for-site.md)
