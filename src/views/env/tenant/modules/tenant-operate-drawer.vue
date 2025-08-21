<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import { fetchCreateTenant, fetchUpdateTenant } from '@/service/api/env/tenant';
import { useDict } from '@/hooks/business/dict';
import { useFormRules, useNaiveForm } from '@/hooks/common/form';
import { $t } from '@/locales';

defineOptions({
  name: 'TenantOperateDrawer'
});

interface Props {
  /** the type of operation */
  operateType: NaiveUI.TableOperateType;
  /** the edit row data */
  rowData?: Api.Env.Tenant | null;
}

const props = defineProps<Props>();

interface Emits {
  (e: 'submitted'): void;
}

const emit = defineEmits<Emits>();

const visible = defineModel<boolean>('visible', {
  default: false
});

const { formRef, validate, restoreValidation } = useNaiveForm();
const { createRequiredRule } = useFormRules();

const title = computed(() => {
  const titles: Record<NaiveUI.TableOperateType, string> = {
    add: '新增环境租户信息',
    edit: '编辑环境租户信息'
  };
  return titles[props.operateType];
});

type Model = Api.Env.TenantOperateParams;

const model: Model = reactive(createDefaultModel());

function createDefaultModel(): Model {
  return {
    name: '',
    appId: '',
    accountId: '',
    status: ''
  };
}

type RuleKey = Extract<keyof Model, 'name' | 'appId' | 'accountId' | 'status'>;

const rules: Record<RuleKey, App.Global.FormRule> = {
  name: createRequiredRule('租户名称不能为空'),
  appId: createRequiredRule('租户AppId不能为空'),
  accountId: createRequiredRule('租户账号不能为空'),
  status: createRequiredRule('状态（0正常 1停用）不能为空')
};

function handleUpdateModelWhenEdit() {
  if (props.operateType === 'add') {
    Object.assign(model, createDefaultModel());
    return;
  }

  if (props.operateType === 'edit' && props.rowData) {
    Object.assign(model, props.rowData);
  }
}

function closeDrawer() {
  visible.value = false;
}

async function handleSubmit() {
  await validate();

  const { id, name, appId, accountId, status } = model;

  // request
  if (props.operateType === 'add') {
    const { error } = await fetchCreateTenant({ name, appId, accountId, status });
    if (error) return;
  }

  if (props.operateType === 'edit') {
    const { error } = await fetchUpdateTenant({ id, name, appId, accountId, status });
    if (error) return;
  }

  window.$message?.success($t('common.updateSuccess'));
  closeDrawer();
  emit('submitted');
}
const { options: sysNormalDisableOptions } = useDict('sys_normal_disable');

watch(visible, () => {
  if (visible.value) {
    handleUpdateModelWhenEdit();
    restoreValidation();
  }
});
</script>

<template>
  <NDrawer v-model:show="visible" :title="title" display-directive="show" :width="800" class="max-w-90%">
    <NDrawerContent :title="title" :native-scrollbar="false" closable>
      <NForm ref="formRef" :model="model" :rules="rules">
        <NFormItem label="租户名称" path="name">
          <NInput v-model:value="model.name" placeholder="请输入租户名称" />
        </NFormItem>
        <NFormItem label="租户AppId" path="appId">
          <NInput v-model:value="model.appId" placeholder="请输入租户AppId" />
        </NFormItem>
        <NFormItem label="租户账号" path="accountId">
          <NInput v-model:value="model.accountId" placeholder="请输入租户账号" />
        </NFormItem>
        <NFormItem label="状态" path="status">
          <NRadioGroup v-model:value="model.status">
            <NSpace>
              <NRadio
                v-for="option in sysNormalDisableOptions"
                :key="option.value"
                :value="option.value"
                :label="option.label"
              />
            </NSpace>
          </NRadioGroup>
        </NFormItem>
      </NForm>
      <template #footer>
        <NSpace :size="16">
          <NButton @click="closeDrawer">{{ $t('common.cancel') }}</NButton>
          <NButton type="primary" @click="handleSubmit">{{ $t('common.confirm') }}</NButton>
        </NSpace>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped></style>
