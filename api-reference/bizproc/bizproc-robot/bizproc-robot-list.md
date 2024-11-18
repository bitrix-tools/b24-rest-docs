# Получить список зарегистрированных приложением роботов bizproc.robot.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список роботов, зарегистрированных приложением.

## Примеры

{% list tabs %}

- JS

	```javascript
	BX24.callMethod(
		'bizproc.robot.list',
		{},
		function(result)
		{
			if(result.error())
				alert("Error: " + result.error());
			else
				alert("Успешно: " + result.data().join(', '));
		}
	);
	```

- B24-PHP-SDK

	```php
	try {
		$result = $serviceBuilder
			->getBizProcScope()
			->robot()
			->list();

		foreach ($result->getRobots() as $robot) {
			print($robot->code);
			print($robot->name);
			print($robot->handlerUrl);
			print($robot->authUserId);
			print($robot->isUseSubscription ? 'Yes' : 'No');
			print($robot->isUsePlacement ? 'Yes' : 'No');
			if ($robot->createdDate instanceof DateTime) {
				print($robot->createdDate->format(DateTime::ATOM));
			}
		}
	} catch (Throwable $e) {
		// Handle the exception
		print('Error: ' . $e->getMessage());
	}
	```
{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}