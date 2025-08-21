# Пункт редактирования блока LANDING_BLOCK

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров

{% endnote %}

{% endif %}

На данный момент разработчики имеют возможность внедриться в пункты редактирования любого блока. В случае такой регистрации рядом с кнопками блока «Редактировать» и «Дизайн» появится кнопка вызова вашего приложения.

Код для встройки приложения зависит от кода блока и в общем виде выглядит так: `LANDING_BLOCK_<CODE>`. Если в случае системного блока все понятно, и вместо `<CODE>` нужно вставить код блока (примеры ниже), то в случае встраивания в зарегистрированный вами же блок нужно подставить его идентификатор.

Например:

1. Регистрируем [блок](../user-blocks/landing-repo-register.md). Метод вернет `ID` блока. Пусть он равен 1132, для примера.
2. При регистрации места встраивания указываем код: `LANDING_BLOCK_repo_1132` (или `LANDING_BLOCK_REPO_1132`, регистр не важен).

## Параметры

Для данного места встраивания доступны параметры:

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **ID**
[`unknown`](../../data-types.md) | – идентификатор блока. | ||
|| **CODE**
[`unknown`](../../data-types.md) | – символьный код блока. | ||
|| **LID**
[`unknown`](../../data-types.md) | – идентификатор страницы. | ||
|#

Получить параметры можно из PLACEMENT_OPTIONS:

```php
$placement = isset($_REQUEST['PLACEMENT_OPTIONS'])
    ? json_decode($_REQUEST['PLACEMENT_OPTIONS'], true)
    : [];
```

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.repo.bind',
    		{
    			fields: {
    				PLACEMENT: 'LANDING_BLOCK_04.1.one_col_fix_with_title',
    				PLACEMENT_HANDLER: 'https://cpe/rt/placement.php',
    				TITLE: 'My block'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.info(result);
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.repo.bind',
                [
                    'fields' => [
                        'PLACEMENT'        => 'LANDING_BLOCK_04.1.one_col_fix_with_title',
                        'PLACEMENT_HANDLER' => 'https://cpe/rt/placement.php',
                        'TITLE'            => 'My block',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding landing block: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.bind',
        {
            fields: {
                PLACEMENT: 'LANDING_BLOCK_04.1.one_col_fix_with_title',
                PLACEMENT_HANDLER: 'https://cpe/rt/placement.php',
                TITLE: 'My block'
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

{% endlist %}



Если вы хотите встроить универсальное приложение для каждого блока, следует указывать код со *:

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.repo.bind',
    		{
    			fields: {
    				PLACEMENT: 'LANDING_BLOCK_*',
    				PLACEMENT_HANDLER: 'https://cpe/rt/placement.php',
    				TITLE: 'My block'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.info(result);
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.repo.bind',
                [
                    'fields' => [
                        'PLACEMENT'        => 'LANDING_BLOCK_*',
                        'PLACEMENT_HANDLER' => 'https://cpe/rt/placement.php',
                        'TITLE'            => 'My block',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding landing repository: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.repo.bind',
        {
            fields: {
                PLACEMENT: 'LANDING_BLOCK_*',
                PLACEMENT_HANDLER: 'https://cpe/rt/placement.php',
                TITLE: 'My block'
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    )
    ```

{% endlist %}

## Обновление блока из приложения

В открывающемся приложении доступна команда на обновление конкретного блока. Подразумевается, что после работы с блоком, из которого вызвано приложение, вам может потребоваться его обновить. Делается это через команду refreshBlock.

### Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'placement.call',
    		{
    			type: 'refreshBlock',
    			params: {
    				id: 123 // блок с идентификатором 123
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Блок успешно обновлен');
    	// закрываем слайдер
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->placement
            ->call(
                'refreshBlock',
                [
                    'id' => 123, // блок с идентификатором 123
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Блок успешно обновлен';
        // закрываем слайдер
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при обновлении блока: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.placement.call(
        'refreshBlock',
        {
            id: 123 // блок с идентификатором 123
        },
        function()
        {
            console.log('Блок успешно обновлен');
            // закрываем слайдер
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}