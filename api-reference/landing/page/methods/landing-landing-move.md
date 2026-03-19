# Переместить страницу landing.landing.move

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «редактирование» и «удаление» на сайте

Метод `landing.landing.move` перемещает страницу в другой сайт или папку. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы, которую нужно переместить.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), а также из результата методов [landing.landing.add](./landing-landing-add.md), [landing.landing.addByTemplate](./landing-landing-add-by-template.md) и [landing.landing.copy](./landing-landing-copy.md) ||
|| **toSiteId**
[`integer`](../../../data-types.md) | Идентификатор сайта назначения.

Если параметр не передан или равен `0`, используется текущий сайт страницы.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) ||
|| **toFolderId**
[`integer`](../../../data-types.md) | Идентификатор папки назначения в целевом сайте.

Если параметр не передан или равен `0`, страница переносится в корень целевого сайта.

Если переносите страницу в папку, эта папка должна относиться к тому же сайту. Сразу перенести страницу в другой сайт и в папку этого сайта нельзя — метод вернет ошибку. В таком случае сначала перенесите страницу в нужный сайт, а потом отдельным вызовом — в нужную папку.

Идентификатор папки можно получить методом [landing.site.getFolders](../../site/landing-site-get-folders.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 2227,
        "toSiteId": 157,
        "toFolderId": 95
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.move.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 2227,
        "toSiteId": 157,
        "toFolderId": 95,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.move.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.move',
    		{
    			lid: 2227,
    			toSiteId: 157,
    			toFolderId: 95
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
                'landing.landing.move',
                [
                    'lid' => 2227,
                    'toSiteId' => 157,
                    'toFolderId' => 95,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error moving page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.move',
        {
            lid: 2227,
            toSiteId: 157,
            toFolderId: 95
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
        'landing.landing.move',
        [
            'lid' => 2227,
            'toSiteId' => 157,
            'toFolderId' => 95,
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
    "result": true,
    "time": {
        "start": 1773789756,
        "finish": 1773789756.4837,
        "duration": 0.4837000370025635,
        "processing": 0,
        "date_start": "2026-03-18T02:22:36+03:00",
        "date_finish": "2026-03-18T02:22:36+03:00",
        "operating_reset_at": 1773790356,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат переноса. При успехе возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "FOLDER_NOT_FOUND",
    "error_description": "Папка не найдена"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` ||
|| `LANDING_NOT_EXIST` | Страница не найдена, удалена или недоступна текущему пользователю ||
|| `ACCESS_DENIED` | Недостаточно прав на изменение целевого сайта ||
|| `DELETE_ACCESS_DENIED` | Недостаточно прав на удаление исходной страницы ||
|| `FOLDER_NOT_FOUND` | Целевая папка не найдена или недоступна для проверки. Эта ошибка также возникает, если в одном вызове одновременно сменить сайт страницы и передать папку другого сайта ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-copy.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-mark-delete.md)
- [{#T}](./landing-landing-update.md)
