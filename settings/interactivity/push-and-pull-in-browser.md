# Push&Pull в браузере

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Рассмотрим как работать со штатным Push & Pull клиентом в рамках приложения. Пример страницы для приложения с веб-интерфейсом:

```js
<!DOCTYPE html>
<html>
<head>
	<title>Bitri24 application with Push & Pull</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<script src="//api.bitrix24.tech/api/v1/"></script>
	<script src="//api.bitrix24.tech/api/v1/pull/"></script>
</head>
<body>
	<script>
		
		window.appPullClient = new BX.PullClient({
			restApplication: 'myApplication_test.bitrix24.ru',
			restClient: BX24,
			userId: 1
		});
		window.appPullClient.subscribe({
			moduleId: 'application',
			callback: function (data) {
				console.warn(data); // {command: '...', params: {...}, extra: {...}}
			}.bind(this)
		});
		
		window.appPullClient.start();
				
	</script>
</body>
</html>
```

При инициализации *BX.PullClient* необходимо указать следующие параметры:

- `restApplication` — укажите произвольный строковый идентификатор приложения. (Должен быть уникален для каждого портала, на котором установлено ваше приложение)
- `userId` — укажите идентификатор текущего авторизованного пользователя

Подключение PullClient позволит front-end вашего приложения получать события из канала, которые туда будет отправлять back-end вашего же приложения при помощи метода [pull.application.event.add](./push-and-pull/pull-application-event-add.md).
