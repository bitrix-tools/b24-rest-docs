# Получить список разделов хранилища entity.section.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.section.get` получает список разделов хранилища (секций инфоблока). Списочный метод.

Пользователь должен обладать хотя бы правами на чтение (**R**) хранилища.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Обязательный. Строковой идентификатор хранилища. ||
|| **SORT**
[`unknown`](../../data-types.md) | Массив для сортировки, имеющий вид `by1`=>`order1`[, `by2`=>`order2` [, ..]], где `by1, ...` - поле сортировки, может принимать значения: 
- **ID** - код раздела;
- **SECTION** - код родительской раздела;
- **NAME** - название раздела;
- **CODE** - символьный код раздела;
- **ACTIVE** - активности раздела
- **LEFT_MARGIN** - левая граница;
- **DEPTH_LEVEL** - глубина вложенности (начинается с 1);
- **SORT** - индекс сортировки;
- **CREATED** - по времени создания раздела;
- **CREATED_BY** - по идентификатору создателя раздела;
- **MODIFIED_BY** - по идентификатору пользователя изменившего раздела;
- **TIMESTAMP_X** - по времени последнего изменения.

*order1, ...* - порядок сортировки, может принимать значения:
- **ASC** - по возрастанию;
- **DESC** - по убыванию.
Значение по умолчанию `Array("SORT"=>"ASC")` означает, что результат выборки будет отсортирован по возрастанию. Если задать пустой массив `Array()`, то результат отсортирован не будет. ||
|| **FILTER**
[`unknown`](../../data-types.md) | Массив вида `array("фильтруемое поле"=>"значение" [, ...])`. `Фильтруемое поле` может принимать значения:
- **ACTIVE** - фильтр по активности (Y\|N);
- **NAME** - по названию (можно искать по шаблону [%_]);
- **CODE** - по символьному коду (по шаблону [%_]);
- **SECTION_ID** - по коду раздела-родителя (если указать false, то будут возвращены корневые разделы);
- **DEPTH_LEVEL** - по уровню вложенности (начинается с 1);
- **LEFT_MARGIN**, **RIGHT_MARGIN** - по положению в дереве (используется, когда необходима выборка дерева подразделов);
- **ID** - по коду раздела;
- **TIMESTAMP_X** - по времени последнего изменения;
- **DATE_CREATE** - по времени создания;
- **MODIFIED_BY** - по коду пользователя изменившему раздел;
- **CREATED_BY** - по создателю;
Все фильтруемые поля могут содержать перед названием тип проверки фильтра. Необязательное. По умолчанию записи не фильтруются. ||
|| **start** | Порядковый номер элемента списка, начиная с которого необходимо возвращать следующие элементы при вызове текущего метода. Подробности в статье [{#T}](../../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'entity.section.get',
    		{
    			ENTITY: 'menu_new',
    			SORT: {
    				'NAME': 'ASC'
    			}
    		}
    	);
    	
    	const sections = response.getData().result;
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
            ->core
            ->call(
                'entity.section.get',
                [
                    'ENTITY' => 'menu_new',
                    'SORT'   => [
                        'NAME' => 'ASC'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        $sections = $result->data();
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting entity sections: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.section.get',
        {
            ENTITY: 'menu_new',
            SORT: {
                'NAME': 'ASC'
            }
        },
        function(result){
            sections = result.data();
        }
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.section.get.json?ENTITY=menu_new&SORT%5BNAME%5D=ASC&auth=9affe382af74d9c5caa588e28096e872
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{
    "result":
    [
        {
            "ID":"219",
            "CODE":null,
            "TIMESTAMP_X":"2013-06-23T10:11:59+03:00",
            "DATE_CREATE":"2013-06-23T10:11:59+03:00",
            "CREATED_BY":"1","MODIFIED_BY":"1",
            "ACTIVE":"Y",
            "SORT":"500",
            "NAME":"Вторая тестовая секция",
            "PICTURE":null,
            "DETAIL_PICTURE":null,
            "DESCRIPTION":null,
            "LEFT_MARGIN":"1",
            "RIGHT_MARGIN":"2",
            "DEPTH_LEVEL":"1",
            "ENTITY":"menu_new",
            "SECTION":null
        },
        {
            "ID":"218",
            "CODE":null,
            "TIMESTAMP_X":"2013-06-23T10:24:46+03:00",
            "DATE_CREATE":"2013-06-23T10:08:54+03:00",
            "CREATED_BY":"1",
            "MODIFIED_BY":"1",
            "ACTIVE":"Y",
            "SORT":"500",
            "NAME":"Первая тестовая секция",
            "PICTURE":null,
            "DETAIL_PICTURE":null,
            "DESCRIPTION":null,
            "LEFT_MARGIN":"3",
            "RIGHT_MARGIN":"4",
            "DEPTH_LEVEL":"1",
            "ENTITY":"menu_new",
            "SECTION":null
        }
    ],
    "total":2
}
```

