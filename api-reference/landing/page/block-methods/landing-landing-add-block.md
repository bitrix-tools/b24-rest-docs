# Добавление нового блока на страницу

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы (3 ссылки раздела Сайты)

{% endnote %}

{% endif %}

{% note info "landing.landing.addblock" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.landing.addblock` добавляет новый блок на страницу. Возвращает идентификатор нового блока или ошибку.

## Параметры

#|
|| **Метод** | **Описание** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы ||
|| **fields**
[`unknown`](../../../data-types.md) | Массив полей блока, где из поддерживаемого пока только следующие значения:
- **CODE** - символьный код блока. Код блока можно получить из метода [landing.block.getrepository](.). Если добавляется блок, который был зарегистрирован партнером через [landing.repo.register](.), то необходимо передавать для CODE значение `repo_<ID>`, где `<ID>` - идентификатор такого блока.
- **AFTER_ID** - после какого блока (его ID) надо добавить новый блок (если не указано, блок добавится в начало)
- **ACTIVE** - активность блока (Y/N)
- **CONTENT** - полностью иное содержимое блока (см. замечания для метода [landing.block.updatecontent](.)) ||
|#

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.addblock',
    		{
    			lid: 351,
    			fields: {
    				CODE: '15.social'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
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
                'landing.landing.addblock',
                [
                    'lid' => 351,
                    'fields' => [
                        'CODE' => '15.social'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding block: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.addblock',
        {
            lid: 351,
            fields: {
                CODE: '15.social'
            }
        },
        function(result)
        {
            if(result.error())
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

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}