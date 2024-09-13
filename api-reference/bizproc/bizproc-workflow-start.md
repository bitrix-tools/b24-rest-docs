# Запустить бизнес-процесс bizproc.workflow.start

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
- не прописаны ссылки на несозданные ещё страницы.
- совершенно непонятно, при чем тут lists.element.add и что такое "будет **bistrix_processe**". просто уму не растяжимо :(
- нужны более подробные описания параметров. что может быть идентификатором документа, например. Нужны подробности про PARAMETERS

{% endnote %}

{% endif %}

> Scope: [`bizproc`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод запускает Бизнес-процесс.

Для запуска БП из ленты новостей используйте метод [lists.element.add](.). `IBLOCK_TYPE_ID` в этом случае будет **bistrix_processe**.

 

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **TEMPLATE_ID** | Идентификатор шаблона БП. ||
|| **DOCUMENT_ID** | Идентификатор документа БП. ||
|| **PARAMETERS** | Значения параметров БП (если шаблон с параметрами). ||
|#

## Примеры

```js
function startWf(leadId, tplId, cb)
{
	if (!leadId)
	{
		alert('Lead not selected');
		return;
	}
	var params = {
		TEMPLATE_ID: tplId,
		DOCUMENT_ID: ['crm', 'CCrmDocumentLead', leadId],
		PARAMETERS: null
	};
	BX24.callMethod(
		'bizproc.workflow.start',
		params,
		function(result)
		{
			if(result.error())
			alert("Error: " + result.error());
			else if (cb)
				cb();
		}
	);
}
```

Примеры подстановки в параметр DOCUMENT_ID:

```php
['crm', 'CCrmDocumentLead', 'LEAD_777'] – Лид
['crm', 'CCrmDocumentCompany', 'COMPANY_777'] – Компания
['crm', 'CCrmDocumentContact', 'CONTACT_777'] – Контакт
['crm', 'CCrmDocumentDeal', 'DEAL_777'] – Сделка
['disk', 'Bitrix\Disk\BizProcDocument', '777'] – файл Диска
['lists', 'BizprocDocument', '777'] – документ Процессов в ленте (в новостях)
['lists', 'Bitrix\Lists\BizprocDocumentLists', '777'] – документ Списков
```

Пример DOCUMENT_ID для смарт-процесса:

```php
DOCUMENT_ID = ['crm', 'Bitrix\Crm\Integration\BizProc\Document\Dynamic', 'DYNAMIC_147_1']
```

Где 147 – это ID смарт-процесса, 1 – ID элемента.

Пример подстановки в параметр DOCUMENT_ID для новых счетов:

```php
Bitrix\Crm\Integration\BizProc\Document\SmartInvoice
SMART_INVOICE_<ID элемента> 
```

Для передачи в `PARAMETERS` параметра типа «Привязка к пользователю» используйте запись идентификатора пользователя в виде user_ID. Например:

```php
PARAMETERS: {
    'resp_employee': user_14 // ID сотрудника
}
```

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

- из реста БП запускаются только на платных тарифах, на demo лицензиях и лицензиях NFR.

{% endnote %}