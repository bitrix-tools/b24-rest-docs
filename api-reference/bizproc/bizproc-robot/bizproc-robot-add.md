# Зарегистрировать нового робота bizproc.robot.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нет типов параметров и ссылки на страницу типов.
- нет сноски про обязательные параметры
- надо добавить отдельные таблицы и расписать параметры-массивы вроде PROPERTIES
- нужна ссылка на статью про роботов с "ожиданием". да и сама статья такая нужна :)
- не хватает примеров
- нет стандартных блоков

{% endnote %}

{% endif %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод регистрирует нового робота.

#|
|| **Параметр**         | **Описание**  ||

|| **CODE^*^**         | Внутренний идентификатор робота. Допустимые символы `a-z`, `A-Z`, `0-9`, точка, дефис и нижнее подчеркивание. Обязательный параметр.   ||
|| **HANDLER^*^**        | URL приложения, на который будут отправлены данные. Обязательный параметр. ||
|| **AUTH_USER_ID^*^** | ID пользователя, токен которого будет передан приложению. ||
|| **NAME^*^**         | Название робота. Может быть строкой или ассоциативным массивом локализированных строк. Обязательный параметр. ||
|| **USE_SUBSCRIPTION** | Использование подписки. Допустимые значения - `Y` или `N`. Можно указать, должен ли робот ожидать ответа от приложения. Если параметр пустой или не указан - пользователь может сам настроить этот параметр в настройках действия в дизайнере бизнес-процессов. ||
|| **PROPERTIES**     | Массив параметров робота. Список значений аналогичен значениям параметра `RETURN_PROPERTIES`. ||
|| **USE_PLACEMENT** | Дает возможность открывать дополнительные настройки робота в слайдере приложения. Принимает значения (`Y`/`N`). Необязательный параметр. ||
|| **PLACEMENT_HANDLER** | URL встройки (обработчик встройки на стороне приложения). Если использовать параметр `USE_PLACEMENT` со значением "Y", но не указать `PLACEMENT_HANDLER`, то возникает ошибка.   ||
|| **RETURN_PROPERTIES** | Массив возвращаемых значений робота. Параметр управляет возможностью ожидать ответа приложения роботом и работать с данными, которые придут в ответе.

Системное название параметра должно начинаться с буквы и может содержать только символы `a-z`, `A-Z`, `0-9` и нижнее подчеркивание.

{% endnote %}

 Каждый параметр обязательно должен содержать: 
 - **Name**,
 - **Description**,
 - **Type**, 
   - `bool` (Да/Нет)
   - `date` (Дата)
   - `datetime` (Дата/Время)
   - `double` (Число)
   - `int` (Целое число)
   - `select` (Список) массив значений списка:
   - `string` (Строка)
   - `text` (Текст)
   - `user` (Пользователь)
 - **Options** (только для **TYPE** равному `select`)

```php
[
'value1' => 'title1',
'value2' => 'title2',
'value3' => 'title3',
'value4' => 'title4',
]
```

- **Required** (Y/N) - обязательность параметра.
- **Multiple** (Y/N) - множественность параметра.
- **Default** - значение параметра по-умолчанию. По умолчанию тип параметра - `string`, необязательный, немножественный.||
|#

^*^ - обязательные параметры

## Пример


- B24-PHP-SDK

    ```php
        
    try {
        $result = $serviceBuilder
            ->getBizProcScope()
            ->robot()
            ->add(
                'robot_code', // string $code
                'https://example.com/handler', // string $handlerUrl
                1, // int $b24AuthUserId
                ['en' => 'Robot Name'], // array $localizedRobotName
                true, // bool $isUseSubscription
                [], // array $properties
                false, // bool $isUsePlacement
                [] // array $returnProperties
            );
    
        if ($result->isSuccess()) {
            print_r($result->getCoreResponse()->getResponseData()->getResult());
        } else {
            print("Failed to add robot.");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    
    ```

```js
var params = {
	'CODE': 'robot',
	'HANDLER': 'http:///robot.php',
	'AUTH_USER_ID': 1,
	'NAME': 'Пример робота',
	'PROPERTIES': {
		'bool': {
			'Name': 'Да/Нет',
			'Type': 'bool',
			'Required': 'Y',
			'Multiple': 'N'
		},
		'date': {
			'Name': 'Дата',
			'Type': 'date'
		},
		'datetime': {
			'Name': 'Дата/Время',
			'Type': 'datetime'
		},
		'double': {
			'Name': 'Число',
			'Type': 'double',
			'Required': 'Y'
		},
		'int': {
			'Name': 'Целое число',
			'Type': 'int'
		},
		'select': {
			'Name': 'Список',
			'Type': 'select',
			'Options': {
				'one': 'one',
				'two': 'two'
			}
		},
		'string': {
			'Name': 'Строка',
			'Type': 'string',
			'Default': 'default string value'
		},
		'text': {
			'Name': 'Текст',
			'Type': 'text'
		},
		'user': {
			'Name': 'Пользователь',
			'Type': 'user'
		}
	}
};

BX24.callMethod(
	'bizproc.robot.add',
	params,
	function(result)
	{
		if(result.error())
			alert("Error: " + result.error());
		else
			alert("Успешно: " + result.data());
	}
);
```