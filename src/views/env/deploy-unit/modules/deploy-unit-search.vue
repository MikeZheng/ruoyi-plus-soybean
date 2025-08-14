<script setup lang="ts">
import { useNaiveForm } from '@/hooks/common/form';
import { useDict } from '@/hooks/business/dict';
import { $t } from '@/locales';
defineOptions({
  name: 'DeployUnitSearch'
});

interface Emits {
  (e: 'reset'): void;
  (e: 'search'): void;
}

const emit = defineEmits<Emits>();

const { formRef, validate, restoreValidation } = useNaiveForm();

const model = defineModel<Api.Env.DeployUnitSearchParams>('model', { required: true });

const { options: envDeployUnitTypeOptions } = useDict('env_deploy_unit_type');
const { options: envDeployUnitRunTypeOptions } = useDict('env_deploy_unit_run_type');
const { options: envDeployUnitAppTypeOptions } = useDict('env_deploy_unit_app_type');
const { options: envDeployUnitProcessPurposeOptions } = useDict('env_deploy_unit_process_purpose');
const { options: sysNormalDisableOptions } = useDict('sys_normal_disable');
const { options: sysYesNoOptions } = useDict('sys_yes_no');
const { options: envBizTypeOptions } = useDict('env_biz_type');

async function reset() {
  Object.assign(model.value.params!, {});
  await restoreValidation();
  emit('reset');
}

async function search() {
  await validate();
  emit('search');
}
</script>

<template>
  <NCard :bordered="false" size="small" class="card-wrapper">
    <NCollapse>
      <NCollapseItem :title="$t('common.search')" name="user-search">
        <NForm ref="formRef" :model="model" label-placement="left" :label-width="80">
          <NGrid responsive="screen" item-responsive>
            <NFormItemGi span="24 s:12 m:6" label="物理子系统代码" path="subsystemCode" class="pr-24px">
              <NSelect v-model:value="model.subsystemCode" placeholder="请选择物理子系统代码" :options="[]" clearable />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="业务类型" path="bizType" class="pr-24px">
              <NSelect
                v-model:value="model.bizType"
                placeholder="请选择业务类型"
                :options="envBizTypeOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="部署单元编码" path="unitCode" class="pr-24px">
              <NInput v-model:value="model.unitCode" placeholder="请输入部署单元编码" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="中文名称" path="chnName" class="pr-24px">
              <NInput v-model:value="model.chnName" placeholder="请输入中文名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="类型" path="type" class="pr-24px">
              <NSelect
                v-model:value="model.type"
                placeholder="请选择类型"
                :options="envDeployUnitTypeOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="版本" path="version" class="pr-24px">
              <NInput v-model:value="model.version" placeholder="请输入版本" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="应用类型" path="appType" class="pr-24px">
              <NSelect
                v-model:value="model.appType"
                placeholder="请选择应用类型"
                :options="envDeployUnitAppTypeOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="部署用户" path="deployUser" class="pr-24px">
              <NInput v-model:value="model.deployUser" placeholder="请输入部署用户" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="部署目录" path="deployPath" class="pr-24px">
              <NInput v-model:value="model.deployPath" placeholder="请输入部署目录" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="进程名称" path="processName" class="pr-24px">
              <NInput v-model:value="model.processName" placeholder="请输入进程名称" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="进程用途" path="processPurpose" class="pr-24px">
              <NSelect
                v-model:value="model.processPurpose"
                placeholder="请选择进程用途"
                :options="envDeployUnitProcessPurposeOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="使用方式" path="runType" class="pr-24px">
              <NSelect
                v-model:value="model.runType"
                placeholder="请选择使用方式"
                :options="envDeployUnitRunTypeOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="是否开机启动" path="isAutoWhenBoot" class="pr-24px">
              <NSelect
                v-model:value="model.isAutoWhenBoot"
                placeholder="请选择是否开机启动"
                :options="sysYesNoOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="日志目录" path="logPath" class="pr-24px">
              <NInput v-model:value="model.logPath" placeholder="请输入日志目录" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="交易监控日志目录" path="txLogPath" class="pr-24px">
              <NInput v-model:value="model.txLogPath" placeholder="请输入交易监控日志目录" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="启动命令" path="startCmd" class="pr-24px">
              <NInput v-model:value="model.startCmd" placeholder="请输入启动命令" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="停止命令" path="stopCmd" class="pr-24px">
              <NInput v-model:value="model.stopCmd" placeholder="请输入停止命令" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="联系人" path="contact" class="pr-24px">
              <NInput v-model:value="model.contact" placeholder="请输入联系人" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="开发人" path="developer" class="pr-24px">
              <NInput v-model:value="model.developer" placeholder="请输入开发人" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="基础软件或中间件" path="baseSoft" class="pr-24px">
              <NInput v-model:value="model.baseSoft" placeholder="请输入基础软件或中间件" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="基础软件或中间件的版本" path="baseSoftVersion" class="pr-24px">
              <NInput v-model:value="model.baseSoftVersion" placeholder="请输入基础软件或中间件的版本" />
            </NFormItemGi>
            <NFormItemGi span="24 s:12 m:6" label="状态" path="status" class="pr-24px">
              <NSelect
                v-model:value="model.status"
                placeholder="请选择状态"
                :options="sysNormalDisableOptions"
                clearable
              />
            </NFormItemGi>
            <NFormItemGi span="24" class="pr-24px">
              <NSpace class="w-full" justify="end">
                <NButton @click="reset">
                  <template #icon>
                    <icon-ic-round-refresh class="text-icon" />
                  </template>
                  {{ $t('common.reset') }}
                </NButton>
                <NButton type="primary" ghost @click="search">
                  <template #icon>
                    <icon-ic-round-search class="text-icon" />
                  </template>
                  {{ $t('common.search') }}
                </NButton>
              </NSpace>
            </NFormItemGi>
          </NGrid>
        </NForm>
      </NCollapseItem>
    </NCollapse>
  </NCard>
</template>

<style scoped></style>
