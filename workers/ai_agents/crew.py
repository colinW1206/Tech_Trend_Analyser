from crewai import Agent, Crew, Process, Task, LLM
from crewai.project import CrewBase, agent, crew, task
from crewai.agents.agent_builder.base_agent import BaseAgent
from dotenv import load_dotenv
import os

@CrewBase
class Trendanalysercrew():
    """Trendanalysercrew crew"""

    agents: list[BaseAgent]
    tasks: list[Task]

    def __init__(self) -> None:
        self.openrouter_llm = LLM(
            model=os.getenv("OPENAI_MODEL_NAME"),
            base_url=os.getenv("OPENAI_API_BASE"),
            api_key=os.getenv("OPENROUTER_API_KEY")
        )

    # Learn more about YAML configuration files here:
    # Agents: https://docs.crewai.com/concepts/agents#yaml-configuration-recommended
    # Tasks: https://docs.crewai.com/concepts/tasks#yaml-configuration-recommended
    
    # If you would like to add tools to your agents, you can learn more about it here:
    # https://docs.crewai.com/concepts/agents#agent-tools
    @agent
    def tech_trend_identifier(self) -> Agent:
        return Agent(
            config=self.agents_config['tech_trend_identifier'], # type: ignore[index]
            verbose=True,
            llm=self.openrouter_llm
        )

    @agent
    def article_writer(self) -> Agent:
        return Agent(
            config=self.agents_config['article_writer'], # type: ignore[index]
            verbose=True,
            llm=self.openrouter_llm
        )

    # To learn more about structured task outputs,
    # task dependencies, and task callbacks, check out the documentation:
    # https://docs.crewai.com/concepts/tasks#overview-of-a-task
    @task
    def identify_trends_task(self) -> Task:
        return Task(
            config=self.tasks_config['identify_trends_task'], # type: ignore[index]
        )

    @task
    def write_summary_task(self) -> Task:
        return Task(
            config=self.tasks_config['write_summary_task'], # type: ignore[index]
            #output_file='report.md'
        )

    @crew
    def crew(self) -> Crew:
        """Creates the Trendanalysercrew crew"""
        # To learn how to add knowledge sources to your crew, check out the documentation:
        # https://docs.crewai.com/concepts/knowledge#what-is-knowledge

        return Crew(
            agents=self.agents, # Automatically created by the @agent decorator
            tasks=self.tasks, # Automatically created by the @task decorator
            process=Process.sequential,
            verbose=True,
            # process=Process.hierarchical, # In case you wanna use that instead https://docs.crewai.com/how-to/Hierarchical/
        )
