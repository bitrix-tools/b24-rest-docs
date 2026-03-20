# Снять отметку удаления с блока `landing.landing.markundeletedblock`

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.markundeletedblock` снимает с блока признак удаления.

Если страница уже опубликована, для посетителей изменения станут видны после команды «Опубликовать изменения» в интерфейсе или после вызова метода [landing.landing.publication](../methods/landing-landing-publication.md).

Метод снимает только признак удаления. Если блок был скрыт до удаления, после восстановления он останется скрытым. Чтобы снова показать такой блок, используйте [landing.landing.showblock](./landing-landing-show-block.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](../methods/landing-landing-get-list.md), а также из результата методов [landing.landing.add](../methods/landing-landing-add.md), [landing.landing.addByTemplate](../methods/landing-landing-add-by-template.md) и [landing.landing.copy](../methods/landing-landing-copy.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока.

Для восстановления удаленного блока запросите его методом [landing.block.getList](../../block/methods/landing-block-get-list.md) с параметрами `params.edit_mode = 1` и `params.deleted = 1`.

Если передать идентификатор блока другой страницы или несуществующий идентификатор, метод вернет ошибку ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 627,
        "block": 11923
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.markundeletedblock.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 627,
        "block": 11923,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.markundeletedblock.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.landing.markundeletedblock',
            {
                lid: 627,
                block: 11923
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
                'landing.landing.markundeletedblock',
                [
                    'lid' => 627,
                    'block' => 11923,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error restoring block: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.markundeletedblock',
        {
            lid: 627,
            block: 11923
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
        'landing.landing.markundeletedblock',
        [
            'lid' => 627,
            'block' => 11923,
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
        "start": 1773972342,
        "finish": 1773972343.01137,
        "duration": 1.0113699436187744,
        "processing": 1,
        "date_start": "2026-03-20T05:05:42+03:00",
        "date_finish": "2026-03-20T05:05:43+03:00",
        "operating_reset_at": 1773972942,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат снятия признака удаления. При успешном выполнении возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BLOCK_NOT_FOUND",
    "error_description": "Блок не найден в лендинге"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` или `block` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `ACCESS_DENIED` | Недостаточно прав для вызова метода ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не существует или не принадлежит странице `lid` ||
|| `TYPE_ERROR` | Передан неверный тип в параметре `lid`, `block` или `preventHistory` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add-block.md)
- [{#T}](./landing-landing-copy-block.md)
- [{#T}](./landing-landing-delete-block.md)
- [{#T}](./landing-landing-down-block.md)
- [{#T}](./landing-landing-favorite-block.md)
- [{#T}](./landing-landing-hide-block.md)
- [{#T}](./landing-landing-mark-deleted-block.md)
- [{#T}](./landing-landing-move-block.md)
- [{#T}](./landing-landing-show-block.md)
- [{#T}](./landing-landing-unfavorite-block.md)
- [{#T}](./landing-landing-up-block.md)
- [{#T}](../methods/landing-landing-publication.md)
