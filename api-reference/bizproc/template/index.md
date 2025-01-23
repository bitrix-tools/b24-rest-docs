# Шаблоны бизнес-процессов: обзор методов

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

## DOCUMENT_TYPE

Параметр `DOCUMENT_TYPE` всегда представляет собой массив из трех элементов. Например, ['crm', 'CCrmDocumentLead', 'LEAD'] и т.д. Значения в этих элементах являются взаимозависимыми. Иными словами, выбрав значение 'crm' для первого элемента массива, остальные значения, которые можно использовать, являются не произвольными, а конкретными и должны быть связаны с crm. Необходимо внимательно следить за их правильностью.

#|
|| **Элемент** | **Описание** ||
|| **id модуля** | Фактически, здесь указывается область привязки шаблона бизнес-процесса. В Битрикс24 на текущий момент бизнес-процессы используются в объектах CRM, живой ленте, универсальных списках, проектах и Битрикс Диск. Следовательно, возможные значения:

- crm
- livestream?
- lists
- tasks
- disk
  
||
|| **Тип объекта / сущность** | Тип документа представляет собой конкретный объект в рамках указанного модуля/сущности. Например, если в качестве модуля мы указали CRM, то в качестве типа документа можно указать CCrmDocumentLead, чтобы привязать шаблон бизнес-процесса к лидам. Возможные значения:

- для crm: CCrmDocumentLead, CCrmDocumentDeal, CCrmDocumentCompany, CCrmDocumentContact
- для livestream ... ??
- для lists: BizprocDocument, ??
- tasks: Bitrix\Tasks\Integration\Bizproc\Document\Task, ??
- disk: Bitrix\Disk\BizProcDocument, ??
 ||

|| **Тип документа / конкретный объект** | После указания типа объекта или сущности, необходимо уточнение в виде привязки к конкретному типу документа или лаже конкретному объекту, если это возможно в конкретном случае. Например, в случае привязки шаблона бизнес-процесса к задачам, необходимо указать идентификатор конкретной рабочей группы (проекта). Возможные значения:

- для CCrmDocumentLead: 'LEAD'
- для CCrmDocumentDeal: 'DEAL'
- для CCrmDocumentCompany: 'COMPANY'
- для CCrmDocumentContact: 'CONTACT'
- для BizprocDocument: 'iblock_22' (привязка к конкретному универсальному списку с id 22)
- для Bitrix\Disk\BizProcDocument: 'STORAGE_490' (привязка к конкретному хранилищу файлов с id 490)
- для Bitrix\Tasks\Integration\Bizproc\Document\Task: 'TASK_PROJECT_13' (привязка к конкретной рабочей группе с id 13)
||
|#

{% endnote %}

{% endif %}

#|
|| **Метод** | **Описание** ||
|| [bizproc.workflow.template.add](./bizproc-workflow-template-add.md) | Добавить шаблон бизнес-процесса из файла ||
|| [bizproc.workflow.template.update](./bizproc-workflow-template-update.md) | Обновить шаблон ||
|| [bizproc.workflow.template.list](./bizproc-workflow-template-list.md) | Получить список шаблонов ||
|| [bizproc.workflow.template.delete](./bizproc-workflow-template-delete.md) | Удалить шаблон ||
|#